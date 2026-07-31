/**
 * Returns the system prompt for the Normal Agent.
 *
 * @returns {string}
 */
function normalAgentPrompt() {
    return `
Choose a random number from 1 to 2. Return only the number.
`;
}

module.exports = normalAgentPrompt;
