/**
 * Add tool calls and tool results to the conversation, returning a new updated messages array.
 *
 * @param {Array} messages
 * @param {Object} assistantMessage
 * @param {Array} toolResults
 * @returns {Array} The newly updated messages array
 */
function addToolResultsToMessages(
  messages,
  assistantMessage,
  toolResults
) {
  try {
    if (
      !Array.isArray(
        messages
      )
    ) {
      throw new Error(
        "messages must be an array."
      );
    }

    if (
      !assistantMessage
    ) {
      throw new Error(
        "assistantMessage is required."
      );
    }

    if (
      !Array.isArray(
        toolResults
      )
    ) {
      throw new Error(
        "toolResults must be an array."
      );
    }

    const updatedMessages = [
      ...messages,
      assistantMessage
    ];

    for (
      const toolResult
      of toolResults
    ) {
      updatedMessages.push({
        role:
          "tool",

        tool_call_id:
          toolResult.toolCallId,

        content:
          JSON.stringify({
            success:
              toolResult.success,

            result:
              toolResult.result ??
              null,

            error:
              toolResult.error ??
              null,
          }),
      });
    }

    return updatedMessages;
  } catch (error) {
    const err =
      new Error(
        `addToolResultsToMessages failed: ${
          error &&
          error.message
            ? error.message
            : String(error)
        }`
      );

    err.originalError =
      error;

    throw err;
  }
}

export default addToolResultsToMessages;