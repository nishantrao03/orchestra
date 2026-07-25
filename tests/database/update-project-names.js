import updateProjectNames from "../../tools/database/project/update-project-names.js";

async function testUpdateProjectNames() {
    try {
        const result =
            await updateProjectNames({
                projects: [
                    {
                        projectId:
                            "d8bc342b-ec88-463a-ba8a-1603a6a855b4",
                        projectName:
                            "Chronocraft"
                    }
                ]
            });

        console.log(
            JSON.stringify(
                result,
                null,
                2
            )
        );
    } catch (error) {
        console.error(
            "[TEST UPDATE PROJECT NAMES] Failed",
            error
        );
    }
}

testUpdateProjectNames();