import addMembersToChannels from "../workflows/add-members-to-channel.js";

async function testAddMembersToChannels() {
    try {
        const result =
            await addMembersToChannels({
                projectId:
                    "d8bc342b-ec88-463a-ba8a-1603a6a855b4",
                channels: [
                    {
                        channelId:
                            "C0B8PLY82LB",
                        userIds: [
                            "U0AC0M1S90W",
                            
                        ],
                    },
                    // {
                    //     channelId:
                    //         "C0B8ZNVC9NY",
                    //     userIds: [
                    //         "U0AC0M1S90W",
                    //         "U0B64BSJ4N5"
                    //     ],
                    // },
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
            "[TEST ADD MEMBERS TO CHANNELS] Failed",
            error
        );
    }
}

testAddMembersToChannels();