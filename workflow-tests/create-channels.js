import createChannelsWorkflow from "../workflows/create-channels.js";

async function testCreateChannelsWorkflow() {
    try {
        const result =
            await createChannelsWorkflow({
                userId:
                    "U0AC0M1S90W",
                projectId:
                    "d8bc342b-ec88-463a-ba8a-1603a6a855b4",
                channels: [
                    {
                        name:
                            "d8b-chan-3",
                        isPrivate:
                            true,
                    },
                    {
                        name:
                            "d8b-chan-4",
                        isPrivate:
                            true,
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
            "[TEST CREATE CHANNELS] Failed",
            error
        );
    }
}

testCreateChannelsWorkflow();