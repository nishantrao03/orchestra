import executeLlm from "../utils/llm-execution.js";
import normalAgentPrompt from "../../prompts/agents/normal-agent-prompt.js";
import normalAgentTools from "../../tools-implementation/documentation/normal-agent-documentation.js";

/**
 * Executes the normal agent workflow to handle initial interactions, finalize project context, and determine handover tasks.
 *
 * @param {Object} params - The execution parameters.
 * @param {string} params.userMessage - The latest message provided by the user.
 * @param {Array<Object>} params.messages - The conversation history.
 * @returns {Promise<{projectID: string|null, handoverTask: string|null, message: string, messages: Array<Object>}>} 
 */
export default async function normalAgentExecution({ userMessage, messages = [] }) {
    try {
        const systemPrompt = normalAgentPrompt();
        const userPrompt = `${userMessage}`;

        const responseFormat = {
            type: "json_schema",
            json_schema: {
                name: "normal_agent_response",
                schema: {
                    type: "object",
                    properties: {
                        projectID: {
                            type: "string",
                            description: "The finalized project ID. Set to null if the project is not yet determined.",
                            nullable: true
                        },
                        handoverTask: {
                            type: "string",
                            description: "The remaining tasks from the user's request that this agent cannot perform. Set to null if none or if projectID is not finalized.",
                            nullable: true
                        },
                        message: {
                            type: "string",
                            description: "The professional, conversational message to send back to the user. Never leak internal IDs here."
                        }
                    },
                    required: ["projectID", "handoverTask", "message"]
                }
            }
        };

        const result = await executeLlm(
            systemPrompt,
            userPrompt,
            normalAgentTools,
            responseFormat,
            messages
        );

        if (!result.success) {
            throw new Error(result.error || "LLM execution failed inside the helper.");
        }

        const parsedContent = JSON.parse(result.finalResponse);

        console.log("[NORMAL AGENT] Extracted Result:", parsedContent);

        return {
            projectID: parsedContent.projectID,
            handoverTask: parsedContent.handoverTask,
            message: parsedContent.message,
            messages: result.messages
        };
    } catch (error) {
        console.error(
            "[NORMAL AGENT] Execution failed.",
            error
        );

        throw error;
    }
}

/**
 * Executes an independent test for the normalAgentExecution function to validate the interaction and handover logic.
 */
async function testNormalAgentExecution() {
    console.log("Running normalAgentExecution independent test...");
    
    const mockUserMessage = "(U0AC0M1S90W) Hey, can you create a project called 'Mars Trip', create the channel 'spaceship-build-mars', and add abc@xyz.com to it?";
    // const mockUserMessage = "(U0AC0M1S90W) Hey, I need your help regarding a project."
    // const mockMessages = [
    //     {
    //         role: 'user',
    //         content: 'Hello, how are you doing today? I need your help.'
    //     },
    //     {
    //         role: 'assistant',
    //         content: '{\n' +
    //             '  "projectID": null,\n' +
    //             '  "handoverTask": null,\n' +
    //             `  "message": "Hello! I'm doing well, thank you for asking. How can I help you today?"\n` +
    //             '} '
    //     },
    //     {
    //         role: 'user',
    //         content: '(U0AC0M1S90W) Hey, I need your help regarding a project.'
    //     },
    //     {
    //         role: 'assistant',
    //         tool_calls: [
    //             {
    //                 extra_content: {
    //                     google: {
    //                         thought_signature: 'Ev0DCvoDARFNMg8mt40ljpcW2iUZjy0eCNc16YOVmlENUFWzlcaTgUrCorvng2gkiZlIVzPVhnthCUvG5p35N+4ZW2ktzKXeMuiLodUwBXCM9A9qZmQs+329p7SaXc2Q5A1xPkGcwh3TGTjq8Ztx302zauWiFsoopIJrTtI6IxRpVL0DBC5etRcECVAIS+IuwaPCAtP9v2si+j69xw/rXZfzsD1gyvCbzk+GDgjvxe8jtouMcsxCy6Tsyx9MiQ5oDuI1+Rvy7kBzAnmZ6ov1eq7odUt8BxW95EdcDipAjdo63FY21G+4tN5j/CnapVp/L0PCpOl/qC8P/p9ww7Qo4D2bDnH2L8EAEszcwWw7viAq51bN1K5IBA7UG9QMMGFcSk7XpaWzjAARSjtDZ2665tWK/vH1bpWjg7z0gbB4lZOUGAbeejPimxMMUEtoJ4mXZyWi9wenomr8TBw1mwLrt55dl49NWPf5V9CI2M4sTLQQvrumnJSewYmktKvpqZHHgbN3+fmzvuyzxAiwPnUWt0g4Osb4VShD4cnTtmvS67VEFcD4suwkDZr97/uW8bfKnedzUIpRzVOdFyhrTznsFGPyujD2g4mrFCQyvUH+PaxHj0EtYhn4PdRoWhy2MT7Vt6EbIkDb4z4pn+TuFvtlTya2Q/2gEbdt37jD1spyM18='
    //                     }
    //                 },
    //                 function: {
    //                     arguments: '{"userId":"U0AC0M1S90W"}',
    //                     name: 'get-user-projects-tool'
    //                 },
    //                 id: 'call_893308',
    //                 type: 'function'
    //             }
    //         ]
    //     },
    //     {
    //         role: 'tool',
    //         tool_call_id: 'call_893308',
    //         content: '{"success":true,"result":[{"id":"08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3","name":"Test Project 2"},{"id":"4352d9c3-9762-4cbd-8cfa-bc0e95045f28","name":"AI Project"},{"id":"5e11abfa-ba68-4ea7-8add-242011c9497b","name":"Venus trip"}],"error":null}'
    //     },
    //     {
    //         role: 'assistant',
    //         content: '{\n' +
    //             '  "projectID": null,\n' +
    //             '  "handoverTask": null,\n' +
    //             '  "message": "I can certainly help you with that! I see you are associated with the following projects:\\n\\n- Test Project 2\\n- AI Project\\n- Venus trip\\n\\nWhich of these projects would you like to work on?"\n' +
    //             '} '
    //     }
    // ];
    const mockMessages = [];

    try {
        const result = await normalAgentExecution({
            userMessage: mockUserMessage,
            messages: mockMessages
        });
        
        console.log("\nTest execution finished. Resulting Payload:");
        console.dir(result, { depth: null });
    } catch (error) {
        console.error("\nTest encountered an error:", error);
    }
}

// testNormalAgentExecution();