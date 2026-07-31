/**
 * Returns the system prompt for the Database Agent.
 *
 * @returns {string}
 */
function dbAgentPrompt() {
    return `
Choose a random number from 1 to 1. Return only the number.
`;
}

module.exports = dbAgentPrompt;
