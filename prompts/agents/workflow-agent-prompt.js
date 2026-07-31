/**
 * Returns the system prompt for the Workflow Agent.
 *
 * @returns {string}
 */
function workflowAgentPrompt() {
    return `
Choose a random number from 1 to 1. Return only the number.
`;
}

module.exports = workflowAgentPrompt;
