import validateProjectChannels from "../../tools/database/channel/validate-project-channels.js";

async function testValidateProjectChannels() {
    try {
        const result =
            await validateProjectChannels({
                projectId:
                    "d8bc342b-ec88-463a-ba8a-1603a6a855b4",
                channelIds: [
                    "C0B8ZNVC9NY",
                    "C0B8W2KCU4A",
                    "C1122334455",
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
            "[TEST VALIDATE PROJECT CHANNELS] Failed",
            error
        );
    }
}

testValidateProjectChannels();