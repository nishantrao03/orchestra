import fileDownload from "../tools/files/file-download.js";

import updateIngestion from "../tools/api-call/update-ingestion.js";

import callGemini from "../ai/gemini-helpers/gemini-call-helper.js";

import updateIngestionPrompt from "../prompts/llm-tools/update-ingestion-prompt.js";

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
                    publicFiles
                );
        }

        if (
            hasPrivateFiles
        ) {
            privateFilesUpdateText =
                await fileDownload(
                    privateFiles
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

        /*
        ==========================================================
        Step 7 : Return success
        ==========================================================

        Return the API response
        or an appropriate success object.
        */

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