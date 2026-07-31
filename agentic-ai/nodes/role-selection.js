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
                    nextNode: "member-agent",
                };

            case "manager":
                console.log(
                    `[ROLE SELECTION] User ${state.userId} is a project manager. Routing to Manager Agent Node.`
                );

                return {
                    role: projectMember.role,
                    nextNode: "manager-agent",
                };

            default:
                throw new Error(
                    `Unsupported project role: ${projectMember.role}`
                );
        }
    } catch (error) {
        console.error(
            `[ROLE SELECTION] Failed to verify access for user ${state.userId} and project ${state.projectId}.`,
            error
        );

        return {
            finalResponse:
                "Your access to this project could not be verified. Please try again.",
            nextNode: END,
        };
    }
}