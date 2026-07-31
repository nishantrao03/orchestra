import { Annotation } from "@langchain/langgraph";

const GraphState = Annotation.Root({
    userMessage: Annotation(),

    channelId: Annotation(),
    threadId: Annotation(),

    projectId: Annotation(),
    userId: Annotation(),
    role: Annotation(),

    subtasks: Annotation(),
    currentSubtaskIndex: Annotation(),

    executionPlan: Annotation(),

    nextNode: Annotation(),

    managerAgentCounter: Annotation(),

    result: Annotation(),

    finalResponse: Annotation(),
});

export default GraphState;