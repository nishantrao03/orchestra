import { Annotation } from "@langchain/langgraph";

const GraphState = Annotation.Root({
    userMessage: Annotation(),

    channelId: Annotation(),
    threadId: Annotation(),

    projectId: Annotation(),
    userId: Annotation(),
    role: Annotation(),

    executionAgent: Annotation(),

    subtasksMetadata: Annotation(),
    currentSubtaskIndex: Annotation(),

    executionPlan: Annotation(), // TBR

    prevNode: Annotation(),
    nextNode: Annotation(),

    managerAgentCounter: Annotation(), // TBR

    result: Annotation(), // TBR

    finalResponse: Annotation(),
});

export default GraphState;

// TBR = To be removed.