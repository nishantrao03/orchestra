import graph from "../graph/orchestra-graph.js";

/**
 * Executes a test of the LangGraph utilizing the Normal Agent to handle an ongoing interaction with pre-existing conversation history.
 */
async function testGraph() {
    try {
        console.log("===== Starting Graph Test =====");

        const result = await graph.invoke({
            userMessage: "(U0AC0M1S90W) Can you please store the document 'https://files.slack.com/files-pri/T0ABZA0JHHT-F0B9R6URVMG/download/project_guidelines.pdf' for the project?",
            channelId: "D12345678",
            threadId: "130724.19836",
            projectId: null,
            userId: "U0AC0M1S90W",
            role: null,
            executionAgent: null,
            handoverTask: null,
            subtasksMetadata: [],
            currentSubtaskIndex: 0,
            continueExecution: true,
            requiresAtomicTools: false,
            messages: [],
            prevNode: null,
            nextNode: null,
            finalResponse: null,
        });

        console.log("\n===== Final State =====");
        console.dir(result, { depth: null });
    } catch (error) {
        console.error(error);
    }
}

testGraph();