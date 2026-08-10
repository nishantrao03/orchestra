import dotenv from "dotenv";

dotenv.config();

const CONTEXT_RETRIEVAL_SERVICE_URL  = process.env.CONTEXT_RETRIEVAL_SERVICE_URL;

async function retrieveChunks(
    query,
    project_id,
    apply_privacy_filter
) {
    try {
        if (
            !query
            || typeof query !==
                "string"
        ) {
            throw new Error(
                "query must be a valid string."
            );
        }

        if (
            !project_id
            || typeof project_id !==
                "string"
        ) {
            throw new Error(
                "project_id must be a valid string."
            );
        }

        if (
            typeof apply_privacy_filter !==
            "boolean"
        ) {
            throw new Error(
                "apply_privacy_filter must be a boolean."
            );
        }

        const response = await fetch(
            `${CONTEXT_RETRIEVAL_SERVICE_URL}/api/retrieve`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    query,
                    project_id,
                    apply_privacy_filter
                })
            }
        );

        if (!response.ok) {
            const errorResponse =
                await response.text();

            throw new Error(
                `Retrieve chunks failed: ${errorResponse}`
            );
        }

        return await response.json();
    } catch (error) {
        const err = new Error(
            `retrieveChunks failed: ${error && error.message ? error.message : String(error)}`
        );
        err.originalError = error;
        throw err;
    }
}

export default retrieveChunks;