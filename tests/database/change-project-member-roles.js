import changeProjectMemberRoles from "../../tools/database/project/change-project-member-roles.js";

async function testChangeProjectMemberRoles() {
    try {
        const result =
            await changeProjectMemberRoles({
                users: [
                    {
                        projectId:
                            "d8bc342b-ec88-463a-ba8a-1603a6a855b4",
                        userId:
                            "U87654321",
                        role:
                            "manager"
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
            "[TEST CHANGE PROJECT MEMBER ROLES] Failed",
            error
        );
    }
}

testChangeProjectMemberRoles();