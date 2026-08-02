/**
 * Returns the system prompt for the Response Agent.
 *
 * @returns {string}
 */
function responseAgentPrompt() {
    return `
Choose a random number from 1 to 1. Return only the number.
`;
}

module.exports = responseAgentPrompt;
