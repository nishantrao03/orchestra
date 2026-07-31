import graph from "../graph/orchestra-graph.js";

async function testGraph() {
    try {
        console.log("===== Starting Graph Test =====");

        const result = await graph.invoke({
            userMessage: "Test Message",
            projectId: "pid-011",
            userId: "U1234",
            role: null,

            channelId: "C0123",
            threadId: null,

            subtasks: [],
            currentSubtaskIndex: 0,

            executionPlan: [],

            nextNode: null,

            managerAgentCounter: 0,

            workflowResult: null,

            finalResponse: null,
        });

        console.log("\n===== Final State =====");
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

testGraph();