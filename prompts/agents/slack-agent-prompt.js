/**
 * Returns the system prompt for the Slack Agent.
 *
 * @returns {string}
 */
function slackAgentPrompt() {
    return `
Choose a random number from 1 to 1. Return only the number.
`;
}

module.exports = slackAgentPrompt;
