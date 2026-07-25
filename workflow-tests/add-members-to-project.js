import addMembersToProject from "../workflows/add-members-to-project.js";

async function testAddMembersToProject() {
    try {
        const result =
            await addMembersToProject({
                projectId:
                    "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3",
                users: [
                    {
                        userId:
                            "U0AC0M1S90W",
                        role:
                            "manager"
                    }
                    // {
                    //     userId:
                    //         "U87654321",
                    //     role:
                    //         "member"
                    // }
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
            "[TEST ADD MEMBERS TO PROJECT] Failed",
            error
        );
    }
}

testAddMembersToProject();