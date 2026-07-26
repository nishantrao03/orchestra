import fileDownload from "../tools/files/file-download.js";

import updateIngestion from "../tools/api-call/update-ingestion.js";

import callGemini from "../ai/gemini-helpers/gemini-call-helper.js";

import updateIngestionPrompt from "../prompts/llm-tools/update-ingestion-prompt.js";

function prepareFilesForDownload(
    files,
    updateType
) {
    try {
        if (
            !Array.isArray(
                files
            )
        ) {
            throw new Error(
                `${updateType}.files must be an array.`
            );
        }

        console.log(
            `[INGEST UPDATES] Preparing ${files.length} ${updateType} file(s) for download`
        );

        const preparedFiles =
            files.map(
                (
                    fileUrl,
                    index
                ) => {
                    try {
                        if (
                            typeof fileUrl !==
                            "string"
                        ) {
                            throw new Error(
                                `${updateType}.files[${index}] must be a string.`
                            );
                        }

                        if (
                            !fileUrl.trim()
                        ) {
                            throw new Error(
                                `${updateType}.files[${index}] cannot be empty.`
                            );
                        }

                        const isSlackFile =
                            fileUrl.includes(
                                "files.slack.com"
                            );

                        const preparedFile = {
                            "file-link":
                                fileUrl,

                            source:
                                isSlackFile
                                    ? "slack"
                                    : "gdrive",
                        };

                        if (
                            isSlackFile
                        ) {
                            const parsedUrl =
                                new URL(
                                    fileUrl
                                );

                            const fileName =
                                parsedUrl.pathname
                                    .split(
                                        "/"
                                    )
                                    .pop();

                            if (!fileName) {
                                throw new Error(
                                    `Unable to extract document name from ${updateType}.files[${index}].`
                                );
                            }

                            const documentName =
                                decodeURIComponent(
                                    fileName
                                );

                            const documentType =
                                documentName
                                    .split(
                                        "."
                                    )
                                    .pop()
                                    .toLowerCase();

                            if (
                                !documentType
                                || documentType ===
                                    documentName.toLowerCase()
                            ) {
                                throw new Error(
                                    `Unable to extract document type from ${updateType}.files[${index}].`
                                );
                            }

                            preparedFile.document_name =
                                documentName;

                            preparedFile.document_type =
                                documentType;
                        }

                        return preparedFile;
                    } catch (error) {
                        const err =
                            new Error(
                                `[INGEST UPDATES] Failed to prepare ${updateType}.files[${index}]: ${error && error.message ? error.message : String(error)}`
                            );

                        err.originalError =
                            error;

                        throw err;
                    }
                }
            );

        console.log(
            `[INGEST UPDATES] Prepared ${preparedFiles.length} ${updateType} file(s) for download`
        );

        return preparedFiles;
    } catch (error) {
        const err =
            new Error(
                `prepareFilesForDownload failed: ${error && error.message ? error.message : String(error)}`
            );

        err.originalError =
            error;

        throw err;
    }
}

function validateUpdateIngestionResponse(
    responseContent
) {
    try {
        if (
            typeof responseContent !==
            "string"
        ) {
            throw new Error(
                "Gemini response content must be a string."
            );
        }

        const normalizedContent =
            responseContent
                .trim()
                .replace(
                    /^```(?:json)?\s*/i,
                    ""
                )
                .replace(
                    /\s*```$/,
                    ""
                )
                .trim();

        if (!normalizedContent) {
            throw new Error(
                "Gemini response content cannot be empty."
            );
        }

        const parsedResponse =
            JSON.parse(
                normalizedContent
            );

        if (
            typeof parsedResponse !==
                "object"
            || parsedResponse ===
                null
            || Array.isArray(
                parsedResponse
            )
        ) {
            throw new Error(
                "Gemini response must be a JSON object."
            );
        }

        const responseKeys =
            Object.keys(
                parsedResponse
            );

        if (
            responseKeys.length ===
                0
            || responseKeys.some(
                (key) =>
                    key !== "public"
                    && key !== "private"
            )
        ) {
            throw new Error(
                "Gemini response must contain only public and/or private sections."
            );
        }

        for (
            const updateType of [
                "public",
                "private",
            ]
        ) {
            if (
                !Object.hasOwn(
                    parsedResponse,
                    updateType
                )
            ) {
                continue;
            }

            const updateSection =
                parsedResponse[
                    updateType
                ];

            if (
                typeof updateSection !==
                    "object"
                || updateSection ===
                    null
                || Array.isArray(
                    updateSection
                )
            ) {
                throw new Error(
                    `Gemini ${updateType} section must be an object.`
                );
            }

            const sectionKeys =
                Object.keys(
                    updateSection
                );

            if (
                sectionKeys.length !==
                    1
                || sectionKeys[0] !==
                    "extracted_updates"
                || !Array.isArray(
                    updateSection.extracted_updates
                )
            ) {
                throw new Error(
                    `Gemini ${updateType} section must contain only an extracted_updates array.`
                );
            }

            for (
                const update of
                updateSection.extracted_updates
            ) {
                if (
                    typeof update !==
                        "object"
                    || update ===
                        null
                    || Array.isArray(
                        update
                    )
                ) {
                    throw new Error(
                        `Each Gemini ${updateType} update must be an object.`
                    );
                }

                const updateKeys =
                    Object.keys(
                        update
                    );

                if (
                    updateKeys.length !==
                        2
                    || !Object.hasOwn(
                        update,
                        "atomic_fact"
                    )
                    || !Object.hasOwn(
                        update,
                        "context"
                    )
                    || typeof update.atomic_fact !==
                        "string"
                    || typeof update.context !==
                        "string"
                ) {
                    throw new Error(
                        `Each Gemini ${updateType} update must contain only string atomic_fact and context fields.`
                    );
                }
            }
        }

        return parsedResponse;
    } catch (error) {
        console.error(
            "[INGEST UPDATES] Gemini response validation failed",
            error
        );

        return false;
    }
}

function buildUpdateIngestionPayload(
    validatedUpdateJson
) {
    try {
        if (
            typeof validatedUpdateJson !==
                "object"
            || validatedUpdateJson ===
                null
            || Array.isArray(
                validatedUpdateJson
            )
        ) {
            throw new Error(
                "validatedUpdateJson must be an object."
            );
        }

        const extractedUpdates =
            [];

        for (
            const [
                updateType,
                isPrivate,
            ] of [
                [
                    "public",
                    false,
                ],
                [
                    "private",
                    true,
                ],
            ]
        ) {
            if (
                !Object.hasOwn(
                    validatedUpdateJson,
                    updateType
                )
            ) {
                continue;
            }

            const updates =
                validatedUpdateJson[
                    updateType
                ].extracted_updates;

            if (
                !Array.isArray(
                    updates
                )
            ) {
                throw new Error(
                    `${updateType}.extracted_updates must be an array.`
                );
            }

            for (
                const update of updates
            ) {
                extractedUpdates.push({
                    atomic_fact:
                        update.atomic_fact,

                    context:
                        update.context,

                    is_private:
                        isPrivate,
                });
            }
        }

        return {
            extracted_updates:
                extractedUpdates,
        };
    } catch (error) {
        const err =
            new Error(
                `buildUpdateIngestionPayload failed: ${error && error.message ? error.message : String(error)}`
            );

        err.originalError =
            error;

        throw err;
    }
}

/**
 * Ingest project updates
 *
 * AI Agent Note:
 * Public and private updates must already be separated.
 *
 * This workflow NEVER determines update visibility.
 * It only processes both sections independently.
 *
 * Flow:
 * 1. Download and parse public/private files separately.
 * 2. Merge extracted file text with corresponding raw update text.
 * 3. Convert both update texts into structured JSON using a single LLM call.
 * 4. Assign is_private=false/true for public/private updates respectively.
 * 5. Merge all updates and call the Update Ingestion API.
 *
 * @param {Object} params
 * @param {Object} params.public
 * @param {string} [params.public.text]
 * @param {Array<string>} [params.public.files=[]]
 * @param {Object} params.private
 * @param {string} [params.private.text]
 * @param {Array<string>} [params.private.files=[]]
 * @param {string} params.projectId
 *
 * @returns {Object}
 */
async function ingestUpdatesWorkflow({
    public: publicUpdates = {},
    private: privateUpdates = {},
    projectId,
}) {
    try {
        /*
        ==========================================================
        Step 1 : Validate input
        ==========================================================

        - Validate projectId.
        - Validate public/private objects.
        - Validate text.
        - Validate file arrays.
        - Ensure at least one update source exists.
        */
        if (!projectId) {
            throw new Error(
                "projectId is required."
            );
        }

        if (
            typeof publicUpdates !==
                "object"
            || publicUpdates ===
                null
            || Array.isArray(
                publicUpdates
            )
        ) {
            throw new Error(
                "public must be an object."
            );
        }

        if (
            typeof privateUpdates !==
                "object"
            || privateUpdates ===
                null
            || Array.isArray(
                privateUpdates
            )
        ) {
            throw new Error(
                "private must be an object."
            );
        }

        const {
            text:
                publicText =
                    "",

            files:
                publicFiles =
                    [],
        } = publicUpdates;

        const {
            text:
                privateText =
                    "",

            files:
                privateFiles =
                    [],
        } = privateUpdates;

        if (
            typeof publicText !==
            "string"
        ) {
            throw new Error(
                "public.text must be a string."
            );
        }

        if (
            typeof privateText !==
            "string"
        ) {
            throw new Error(
                "private.text must be a string."
            );
        }

        if (
            !Array.isArray(
                publicFiles
            )
        ) {
            throw new Error(
                "public.files must be an array."
            );
        }

        if (
            !Array.isArray(
                privateFiles
            )
        ) {
            throw new Error(
                "private.files must be an array."
            );
        }

        const hasPublicText =
            publicText.trim()
                .length > 0;

        const hasPrivateText =
            privateText.trim()
                .length > 0;

        const hasPublicFiles =
            publicFiles.length >
            0;

        const hasPrivateFiles =
            privateFiles.length >
            0;

        if (
            !hasPublicText
            && !hasPrivateText
            && !hasPublicFiles
            && !hasPrivateFiles
        ) {
            throw new Error(
                "At least one public or private update is required."
            );
        }

        const publicFilesForDownload =
            prepareFilesForDownload(
                publicFiles,
                "public"
            );

        const privateFilesForDownload =
            prepareFilesForDownload(
                privateFiles,
                "private"
            );

        /*
        ==========================================================
        Step 2 : Download update files
        ==========================================================

        IMPORTANT

        Public files and private files MUST be processed
        independently.

        Call fileDownload() once for:

        1. public.files

        and once for

        2. private.files

        Never combine both arrays into a single call.
        */

        let publicFilesUpdateText =
            "";

        let privateFilesUpdateText =
            "";

        if (
            hasPublicFiles
        ) {
            publicFilesUpdateText =
                await fileDownload(
                    publicFilesForDownload
                );
        }

        if (
            hasPrivateFiles
        ) {
            privateFilesUpdateText =
                await fileDownload(
                    privateFilesForDownload
                );
        }

        /*
        ==========================================================
        Step 3 : Build final update text
        ==========================================================

        Merge:

        public.text
        +
        extracted public file text

        into

        finalPublicUpdateText

        Similarly merge:

        private.text
        +
        extracted private file text

        into

        finalPrivateUpdateText
        */

        const finalPublicUpdateText =
            [
                publicText,
                publicFilesUpdateText,
            ]
                .filter(
                    (text) =>
                        text.trim().length >
                        0
                )
                .join(
                    "\n\n"
                );

        const finalPrivateUpdateText =
            [
                privateText,
                privateFilesUpdateText,
            ]
                .filter(
                    (text) =>
                        text.trim().length >
                        0
                )
                .join(
                    "\n\n"
                );

        console.log(
            "[INGEST UPDATES] Final public and private update text built"
        );

        /*
        ==========================================================
        Step 4 : Convert update text into structured JSON
        ==========================================================

        Build messages:

        System Prompt:
        updateIngestionPrompt()

        User Prompt:

        ### Public Update Text ###

        {finalPublicUpdateText}

        ### End Public Update Text ###

        ### Private Update Text ###

        {finalPrivateUpdateText}

        ### End Private Update Text ###

        Call Gemini.

        Retry policy:

        Maximum attempts = 3

        Each attempt must:

        - Parse response.
        - Remove markdown if present.
        - Validate JSON.
        - Validate required schema.

        If all attempts fail,
        terminate the workflow.
        */

        const messages = [
            {
                role:
                    "system",

                content:
                    updateIngestionPrompt(),
            },
            {
                role:
                    "user",

                content: `Extract structured updates from the two independent sections below. Keep public and private updates separate, and return only the JSON required by the system instructions.

### Public Update Text ###
${finalPublicUpdateText}
### End Public Update Text ###

### Private Update Text ###
${finalPrivateUpdateText}
### End Private Update Text ###`,
            },
        ];

        const maximumGeminiAttempts =
            3;

        let updateJson =
            null;

        for (
            let attempt = 1;
            attempt <=
                maximumGeminiAttempts;
            attempt++
        ) {
            console.log(
                `[INGEST UPDATES] Gemini extraction attempt ${attempt} of ${maximumGeminiAttempts}`
            );

            const geminiResponse =
                await callGemini(
                    messages
                );

            const responseContent =
                geminiResponse
                    ?.choices?.[0]
                    ?.message?.content;

            const validatedResponse =
                validateUpdateIngestionResponse(
                    responseContent
                );

            if (validatedResponse) {
                updateJson =
                    validatedResponse;

                console.log(
                    "[INGEST UPDATES] Gemini response validated successfully"
                );

                break;
            }

            console.error(
                `[INGEST UPDATES] Gemini extraction attempt ${attempt} returned an invalid response`
            );
        }

        if (!updateJson) {
            throw new Error(
                `Gemini returned an invalid update JSON response after ${maximumGeminiAttempts} attempts.`
            );
        }

        // Console log the updateJson for testing purposes
        console.log(
            "[INGEST UPDATES] Final update JSON:",
            JSON.stringify(updateJson, null, 2)
        );

        /*
        ==========================================================
        Step 5 : Pre-process LLM response
        ==========================================================

        Expected format:

        {
            public: {
                extracted_updates: [...]
            },

            private: {
                extracted_updates: [...]
            }
        }

        Extract:

        public.extracted_updates

        private.extracted_updates

        Assign

        public

        is_private = false

        private

        is_private = true

        Merge into

        {
            extracted_updates: [
                ...
            ]
        }

        This is the payload expected by
        the Update Ingestion API.
        */

        updateJson =
            buildUpdateIngestionPayload(
                updateJson
            );

        console.log(
            "[INGEST UPDATES] Update ingestion payload built successfully"
        );

        console.log(
            "[INGEST UPDATES] Final update ingestion payload:",
            JSON.stringify(
                updateJson,
                null,
                2
            )
        );

        /*
        ==========================================================
        Step 6 : Call Update Ingestion API
        ==========================================================

        Call

        updateIngestion()

        with

        {
            projectId,
            updateJson
        }

        Wait for successful response.
        */

        console.log(
            "[INGEST UPDATES] Starting update ingestion API call"
        );

        const updateIngestionResponse =
            await updateIngestion(
                updateJson,
                projectId
            );

        console.log(
            "[INGEST UPDATES] Updates ingested successfully"
        );

        /*
        ==========================================================
        Step 7 : Return success
        ==========================================================

        Return the API response
        or an appropriate success object.
        */

        return {
            success: true,
            response:
                updateIngestionResponse,
        };

    } catch (error) {
        console.error(
            "[INGEST UPDATES] Workflow failed",
            error
        );

        return {
            success: false,
            error: error.message,
        };
    }
}

export default ingestUpdatesWorkflow;
