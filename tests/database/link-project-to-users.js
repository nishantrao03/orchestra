import linkProjectToUsers from "../../tools/database/project/link-project-to-users.js";

async function testLinkProjectToUsers() {
  console.log("Running linkProjectToUsers test...");
    const projectId = "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3"; // Replace with an actual project ID from your DB
    const usersToLink = [
        { userId: "U12345678", role: "manager" }, // Replace with actual user IDs from your DB
        { userId: "U87654321", role: "member" }
    ];

    try {
        const result = await linkProjectToUsers({ projectId, users: usersToLink });
        console.log("linkProjectToUsers Result:", result);
    } catch (error) {
        console.error("Error in linkProjectToUsers test:", error);
    }

}

testLinkProjectToUsers();
// To run this test, use the command: node tests/database/link-project-to-users.js