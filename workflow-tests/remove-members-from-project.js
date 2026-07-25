import removeMembersFromProject from "../workflows/remove-members-from-project.js";

async function testRemoveMembersFromProject() {
    try {
        const result =
            await removeMembersFromProject({
                projectId:
                    "d8bc342b-ec88-463a-ba8a-1603a6a855b4",
                userIds: [
                    "U12345678",
                    "U1234",
                    "U9012",
                ],
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
            "[TEST REMOVE MEMBERS FROM PROJECT] Failed",
            error
        );
    }
}

testRemoveMembersFromProject();

// To run this test, use the command:
// node workflow-tests/remove-members-from-project.js