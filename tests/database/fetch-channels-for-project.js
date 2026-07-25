import fetchChannelsForProject from "../../tools/database/project/fetch-channels-for-project.js";

async function testFetchChannelsForProject() {
    try {
        const result =
            await fetchChannelsForProject({
                projectId:
                    "d8bc342b-ec88-463a-ba8a-1603a6a855b4",
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
            "[TEST FETCH CHANNELS FOR PROJECT] Failed",
            error
        );
    }
}

testFetchChannelsForProject();

// To run this test, use the command:
// node tests/database/fetch-channels-for-project.js