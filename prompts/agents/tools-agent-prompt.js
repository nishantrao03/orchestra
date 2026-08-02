/**
 * Returns the system prompt for the Tools Agent.
 *
 * @returns {string}
 */
function toolsAgentPrompt() {
    return `
Choose a random number from 1 to 1. Return only the number.
`;
}

module.exports = toolsAgentPrompt;
