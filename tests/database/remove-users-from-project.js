import removeUsersFromProject from "../../tools/database/project/remove-users-from-project.js";

async function testRemoveUsersFromProject() {
    try {
        const result =
            await removeUsersFromProject({
                projectId:
                    "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3",
                userIds: [
                    "U12345678",
                    "U1234"
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
            "[TEST REMOVE USERS FROM PROJECT] Failed",
            error
        );
    }
}

testRemoveUsersFromProject();

// To run this test, use the command:
// node tests/database/remove-users-from-project.js