import { StateGraph, START, END } from "@langchain/langgraph";

import GraphState from "../state/graph-state.js";
import router from "./router.js";

import start from "../nodes/start.js";
import projectRouter from "../nodes/project-router.js";
import normalAgent from "../nodes/normal-agent.js";
import handover from "../nodes/handover.js";
import roleSelection from "../nodes/role-selection.js";
import memberOrchestrator from "../nodes/member-orchestrator.js";
import managerOrchestrator from "../nodes/manager-orchestrator.js";
import executionAgent from "../nodes/execution-agent.js";
import plannerAgent from "../nodes/planner-agent.js";
import responseAgent from "../nodes/response-agent.js";
import workflowAgent from "../nodes/workflow-agent.js";
import toolsAgent from "../nodes/tools-agent.js";

const workflow = new StateGraph(GraphState);

workflow.addNode("start", start);
workflow.addNode("project-router", projectRouter);
workflow.addNode("normal-agent", normalAgent);
workflow.addNode("handover", handover);
workflow.addNode("role-selection", roleSelection);
workflow.addNode("member-orchestrator", memberOrchestrator);
workflow.addNode("manager-orchestrator", managerOrchestrator);
workflow.addNode("execution-agent", executionAgent);
workflow.addNode("planner-agent", plannerAgent);
workflow.addNode("response-agent", responseAgent);
workflow.addNode("workflow-agent", workflowAgent);
workflow.addNode("tools-agent", toolsAgent);

workflow.addEdge(START, "start");
workflow.addEdge("start", "project-router");
workflow.addEdge("normal-agent", "handover");
workflow.addEdge("execution-agent", "member-orchestrator");
workflow.addEdge("workflow-agent", "manager-orchestrator");
workflow.addEdge("tools-agent", "manager-orchestrator");

workflow.addConditionalEdges(
    "project-router",
    router,
    {
        "normal-agent": "normal-agent",
        "role-selection": "role-selection",
    }
);

workflow.addConditionalEdges(
    "handover",
    router,
    {
        "role-selection": "role-selection",
        [END]: END,
    }
);

workflow.addConditionalEdges(
    "role-selection",
    router,
    {
        "member-orchestrator": "member-orchestrator",
        "manager-orchestrator": "manager-orchestrator",
        [END]: END,
    }
);

workflow.addConditionalEdges(
    "member-orchestrator",
    router,
    {
        "execution-agent": "execution-agent",
        "planner-agent": "planner-agent",
        "response-agent": "response-agent",
        [END]: END,
    }
);

workflow.addConditionalEdges(
    "manager-orchestrator",
    router,
    {
        "planner-agent": "planner-agent",
        "response-agent": "response-agent",
        "workflow-agent": "workflow-agent",
        "tools-agent": "tools-agent",
        [END]: END,
    }
);

workflow.addConditionalEdges(
    "planner-agent",
    router,
    {
        "member-orchestrator": "member-orchestrator",
        "manager-orchestrator": "manager-orchestrator",
    }
);

workflow.addConditionalEdges(
    "response-agent",
    router,
    {
        "member-orchestrator": "member-orchestrator",
        "manager-orchestrator": "manager-orchestrator",
    }
);

const graph = workflow.compile();

export default graph;