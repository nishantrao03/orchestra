/**
 * Returns the system prompt for the Manager Agent.
 *
 * @returns {string}
 */
function managerAgentPrompt() {
    return `
Choose a random number from 1 to 7. Return only the number.
`;
}

module.exports = managerAgentPrompt;
