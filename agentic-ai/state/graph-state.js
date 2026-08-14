import { Annotation } from "@langchain/langgraph";

const GraphState = Annotation.Root({
    userMessage: Annotation(),

    channelId: Annotation(),
    threadId: Annotation(),

    projectId: Annotation(),
    userId: Annotation(),
    role: Annotation(),

    executionAgent: Annotation(),

    handoverTask: Annotation(),

    subtasksMetadata: Annotation(),
    currentSubtaskIndex: Annotation(),
    continueExecution: Annotation(),
    requiresAtomicTools: Annotation(),
    messages: Annotation(),

    prevNode: Annotation(),
    nextNode: Annotation(),

    finalResponse: Annotation(),
});

export default GraphState;

// TBR = To be removed.