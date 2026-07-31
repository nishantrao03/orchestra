/**
 * Returns the system prompt for the Planner Agent.
 *
 * @returns {string}
 */
function plannerAgentPrompt() {
    return `
Choose a random number from 1 to 1. Return only the number.
`;
}

module.exports = plannerAgentPrompt;
