import { END } from "@langchain/langgraph";

import { getProjectMember } from "../../redis/security-cache-service.js";

export default async function roleSelection(state) {
    console.log("[ROLE SELECTION] Entered Role Selection Node.");

    try {
        const projectMember = await getProjectMember(
            state.projectId,
            state.userId
        );

        if (!projectMember?.exists) {
            console.log(
                `[ROLE SELECTION] User ${state.userId} is not authorized for project ${state.projectId}.`
            );

            return {
                finalResponse:
                    "You are not authorized to access this project.",
                prevNode: "role-selection",
                nextNode: END,
            };
        }

        switch (projectMember.role) {
            case "member":
                console.log(
                    `[ROLE SELECTION] User ${state.userId} is a project member. Routing to Member Agent Node.`
                );

                return {
                    role: projectMember.role,
                    executionAgent: "member-agent",
                    prevNode: "role-selection",
                    nextNode: "member-orchestrator",
                };

            case "manager":
                console.log(
                    `[ROLE SELECTION] User ${state.userId} is a project manager. Routing to Manager Agent Node.`
                );

                return {
                    role: projectMember.role,
                    executionAgent: "manager-agent",
                    prevNode: "role-selection",
                    nextNode: "manager-orchestrator",
                };

            default:
                throw new Error(
                    `Unsupported project role: ${projectMember.role}`
                );
        }
    } catch (error) {
        console.error(
            "[role-selection Execution failed]",
            error
        );

        return {
            finalResponse:
                "Your access to this project could not be verified. Please try again.",
            prevNode: "role-selection",
            nextNode: END,
            errorDuringExecution: true,
        };
    }
}