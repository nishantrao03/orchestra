import removeMembersFromChannel from "../../tools/slack/remove-members-from-channel.js";

async function testRemoveMembersFromChannel() {
  const channel =
    "C0B8ZNVC9NY";

  const userIds = [
    "U0B64BSJ4N5"
  ];

  try {
    const result =
      await removeMembersFromChannel({
        channel,
        userIds,
      });

    console.log(
      "Members removed:",
      JSON.stringify(
        result,
        null,
        2
      )
    );
  } catch (error) {
    console.log(
      error
    );

    console.error(
      "Error removing members:",
      error.message
    );
  }
}

testRemoveMembersFromChannel();

// To run this test, use the command:
// node tests/slack/remove-members-from-channel.js