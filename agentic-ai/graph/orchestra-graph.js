import { StateGraph, START, END } from "@langchain/langgraph";

import GraphState from "../state/graph-state.js";
import router from "./router.js";

import start from "../nodes/start.js";
import projectRouter from "../nodes/project-router.js";
import normalAgent from "../nodes/normal-agent.js";
import handover from "../nodes/handover.js";
import roleSelection from "../nodes/role-selection.js";
import memberAgent from "../nodes/member-agent.js";
import managerAgent from "../nodes/manager-agent.js";
import slackAgent from "../nodes/slack-agent.js";
import dbAgent from "../nodes/db-agent.js";
import fileAgent from "../nodes/file-agent.js";
import contextAgent from "../nodes/context-agent.js";
import workflowAgent from "../nodes/workflow-agent.js";
import plannerAgent from "../nodes/planner-agent.js";

const workflow = new StateGraph(GraphState);

workflow.addNode("start", start);
workflow.addNode("project-router", projectRouter);
workflow.addNode("normal-agent", normalAgent);
workflow.addNode("handover", handover);
workflow.addNode("role-selection", roleSelection);
workflow.addNode("member-agent", memberAgent);
workflow.addNode("manager-agent", managerAgent);
workflow.addNode("slack-agent", slackAgent);
workflow.addNode("db-agent", dbAgent);
workflow.addNode("file-agent", fileAgent);
workflow.addNode("context-agent", contextAgent);
workflow.addNode("workflow-agent", workflowAgent);
workflow.addNode("planner-agent", plannerAgent);

workflow.addEdge(START, "start");
workflow.addEdge("start", "project-router");
workflow.addEdge("normal-agent", "handover");
workflow.addEdge("member-agent", END);

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
        "member-agent": "member-agent",
        "manager-agent": "manager-agent",
        [END]: END,
    }
);

workflow.addConditionalEdges(
    "manager-agent",
    router,
    {
        "slack-agent": "slack-agent",
        "db-agent": "db-agent",
        "file-agent": "file-agent",
        "context-agent": "context-agent",
        "workflow-agent": "workflow-agent",
        "planner-agent": "planner-agent",
        [END]: END,
    }
);

workflow.addConditionalEdges(
    "slack-agent",
    router,
    {
        "manager-agent": "manager-agent",
    }
);

workflow.addConditionalEdges(
    "db-agent",
    router,
    {
        "manager-agent": "manager-agent",
    }
);

workflow.addConditionalEdges(
    "file-agent",
    router,
    {
        "manager-agent": "manager-agent",
    }
);

workflow.addConditionalEdges(
    "context-agent",
    router,
    {
        "manager-agent": "manager-agent",
    }
);

workflow.addConditionalEdges(
    "workflow-agent",
    router,
    {
        "manager-agent": "manager-agent",
    }
);

workflow.addConditionalEdges(
    "planner-agent",
    router,
    {
        "manager-agent": "manager-agent",
    }
);

const graph = workflow.compile();

export default graph;