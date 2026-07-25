import findUsersByEmail from "../../tools/slack/find-user-by-email.js";

async function testFindUsersByEmail() {
  const emails = [
    "email_id1@domain.com",
    "email_id2@domain.com",
  ];

  try {
    const users =
      await findUsersByEmail({
        emails,
      });

    console.log(
      "Users found:",
      users
    );
  } catch (error) {
    console.log(
      error
    );

    console.error(
      "Error finding users:",
      error.message
    );
  }
}

testFindUsersByEmail();

// To run this test, use the command:
// node tests/slack/find-user-by-email.js