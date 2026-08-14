/**
 * Returns a concise, formatted text list of all available Member Agent tools and workflows.
 * Used to provide the Planner Agent with semantic mapping capabilities without overloading the context window.
 *
 * @returns {string} The formatted list of tools and descriptions.
 */
export default function getMemberAgentPlannerTools() {
    return `1. create-users-tool: Creates users in the database using Slack member IDs.
2. fetch-user-tool: Fetches a user from the database using their Slack member ID.
3. extract-file-content-tool: Downloads and extracts text content from supported Slack or Google Drive files.
4. find-users-by-email-tool: Resolves Slack user email addresses into Slack member IDs.
5. get-user-projects-tool: Retrieves the list of projects a user belongs to.
6. retrieval-private-workflow: Retrieves relevant context from the project's knowledge base.`;
}