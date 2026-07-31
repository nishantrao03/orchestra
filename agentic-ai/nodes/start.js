export default async function start(state) {
    console.log("Entered Start Node");

    try {
        return {
            nextNode: "project-router",
        };
    } catch (error) {
        console.error(
            "[START NODE] Execution failed.",
            error
        );

        throw error;
    }
}
