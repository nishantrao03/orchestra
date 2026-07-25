import removeMembersFromChannels from "../workflows/remove-members-from-channels.js";

async function testRemoveMembersFromChannels() {
    try {
        const result =
            await removeMembersFromChannels({
                projectId:
                    "d8bc342b-ec88-463a-ba8a-1603a6a855b4",
                channels: [
                    {
                        channelId:
                            "C0B8CFL31V4",
                        userIds: [
                            "U0AC0M1S90W"
                        ],
                    },
                    {
                        channelId:
                            "C0B8W2KCU4A",
                        userIds: [
                            "U0B8CFXRCJ2",
                        ],
                    },
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
            "[TEST REMOVE MEMBERS FROM CHANNELS] Failed",
            error
        );
    }
}

testRemoveMembersFromChannels();