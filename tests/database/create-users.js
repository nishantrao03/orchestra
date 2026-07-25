import createUser from "../../tools/database/user/create-users.js";

async function testCreateUser() {
    try {
        const result =
            await createUser({
                users: [
                    "U12340"
                ]
            });

        console.log(
            "Users created successfully:"
        );

        console.log(result);
    } catch (error) {
        console.error(
            "Test failed:"
        );

        console.error(error);
    }
}

testCreateUser();

// To run this test, use the command: node tests/database/create-users.js