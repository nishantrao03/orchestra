import graph from "./graph/orchestra-graph.js";
import buildMessageHistory from "./utils/messages-builder.js";

/**
 * Main entry point for the agentic AI workflow, triggered by incoming Slack message events.
 * Fetches the conversation history, initializes the LangGraph state, executes the orchestrator graph, 
 * and returns the final evaluated response string.
 *
 * @param {Object} params - The incoming Slack message context parameters.
 * @param {string} params.userMessage - The main textual request provided by the user.
 * @param {string} params.channelId - The Slack channel identifier where the message originated.
 * @param {string} params.threadId - The Slack thread identifier, if the message is part of a thread.
 * @param {string} params.userId - The Slack user identifier of the requester.
 * @returns {Promise<string>} The final textual response to be delivered back to the user via Slack.
 */
export default async function runAgenticAI({ userMessage, channelId, threadId, userId }) {
    console.log(`[AGENTIC AI] Starting execution for User: ${userId} in Channel: ${channelId}`);

    try {
        const messages = await buildMessageHistory(channelId, threadId);

        const initialState = {
            userMessage: userMessage,
            channelId: channelId,
            threadId: threadId,
            projectId: null,
            userId: userId,
            role: null,
            executionAgent: null,
            handoverTask: null,
            subtasksMetadata: [],
            currentSubtaskIndex: 0,
            continueExecution: true,
            requiresAtomicTools: false,
            messages: messages,
            prevNode: null,
            nextNode: null,
            finalResponse: null,
        };

        const result = await graph.invoke(initialState);

        if(!result.finalResponse) return "An error occurred during processing. Please try again later.";

        return result.finalResponse;
    } catch (error) {
        console.error(
            "[AGENTIC AI] Graph execution encountered a critical error:", 
            error
        );
        
        return "An error occurred during processing. Please try again later.";
    }
}