/**
 * Appends the assistant's tool call message and the corresponding tool execution results to the conversation history.
 * Implements token safety measures to optimize payload size for subsequent LLM invocations.
 *
 * @param {Array} messages - The existing conversation history array.
 * @param {Object} assistantMessage - The message object from the assistant containing tool calls.
 * @param {Array} toolResults - The array of parsed execution results corresponding to the tool calls.
 * @returns {Array} The newly updated messages array.
 */
function addToolResultsToMessages(messages, assistantMessage, toolResults) {
  try {
    if (!Array.isArray(messages)) throw new Error("messages must be an array.");
    if (!assistantMessage) throw new Error("assistantMessage is required.");
    if (!Array.isArray(toolResults)) throw new Error("toolResults must be an array.");

    if (assistantMessage.tool_calls) {
      assistantMessage.tool_calls.forEach((call) => {
        if (call.extra_content) {
          delete call.extra_content;
        }
      });
    }

    const updatedMessages = [...messages, assistantMessage];
    const MAX_RESULT_LENGTH = 3000; 

    for (const toolResult of toolResults) {
      let serializedResult = JSON.stringify(toolResult.result ?? null);
      
      if (serializedResult.length > MAX_RESULT_LENGTH) {
        serializedResult = serializedResult.substring(0, MAX_RESULT_LENGTH) + '... [TRUNCATED FOR LENGTH]';
      }

      updatedMessages.push({
        role: "tool",
        tool_call_id: toolResult.toolCallId,
        content: JSON.stringify({
          success: toolResult.success,
          result: serializedResult,
          error: toolResult.error ?? null,
        }),
      });
    }

    return updatedMessages;
  } catch (error) {
    const err = new Error(
      `addToolResultsToMessages failed: ${error && error.message ? error.message : String(error)}`
    );
    err.originalError = error;
    throw err;
  }
}

export default addToolResultsToMessages;