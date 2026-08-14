import { END } from "@langchain/langgraph";

export default async function start(state) {
    console.log("Entered Start Node");

    try {
        return {
            prevNode: "start",
            nextNode: "project-router",
        };
    } catch (error) {
        console.error(
            "[start Execution failed]",
            error
        );

        return {
            prevNode: "start",
            nextNode: END,
            errorDuringExecution: true,
        };
    }
}
