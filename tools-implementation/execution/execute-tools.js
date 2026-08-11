import toolRegistry
  from "./tool-registry.js";

/**
 * Execute tool calls requested by the LLM.
 * Parses the function inputs strictly based on the execution format 
 * defined in the tool registry (object vs. positional).
 *
 * @param {Array} toolCalls
 * @returns {Promise<Array>}
 */
async function executeTools(
  toolCalls
) {
  if (
    !Array.isArray(
      toolCalls
    )
  ) {
    throw new Error(
      "toolCalls must be an array."
    );
  }

  const toolResults = [];

  for (
    const toolCall
    of toolCalls
  ) {
    try {
      const toolName =
        toolCall?.function
          ?.name;

      if (
        !toolName
      ) {
        throw new Error(
          "Tool name is missing."
        );
      }

      const toolConfig =
        toolRegistry[
          toolName
        ];

      if (!toolConfig) {
        throw new Error(
          `Unknown tool: ${toolName}`
        );
      }

      const { handler, format } = toolConfig;

      let toolArguments =
        {};

      const rawArguments =
        toolCall?.function
          ?.arguments;

      if (
        rawArguments
      ) {
        try {
          toolArguments =
            JSON.parse(
              rawArguments
            );
        } catch (error) {
          throw new Error(
            `Failed to parse arguments for ${toolName}: ${error.message}`
          );
        }
      }

      let result;

      if (
        format === "object"
      ) {
        result =
          await handler(
            toolArguments
          );
      } else if (
        Array.isArray(format)
      ) {
        const orderedArguments =
          format.map(
            key => toolArguments[key]
          );
        result =
          await handler(
            ...orderedArguments
          );
      } else {
        result =
          await handler();
      }

      console.log(
        result
      );

      toolResults.push({
        toolCallId:
          toolCall.id,

        toolName,

        success:
          true,

        result,
      });
    } catch (error) {
      toolResults.push({
        toolCallId:
          toolCall?.id ??
          null,

        toolName:
          toolCall?.function
            ?.name ??
          null,

        success:
          false,

        error:
          error.message,
      });
    }
  }

  return toolResults;
}

// /**
//  * Test function to validate the execution of different tool format categories.
//  */
// async function testExecuteTools() {
//   const testToolCalls = [
//     {
//       id: "call_primitive_001",
//       function: {
//         name: "fetch-documents-for-project-tool",
//         arguments: JSON.stringify({
//           projectId: "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3",
//         }),
//       },
//     },
//     {
//       id: "call_positional_002",
//       function: {
//         name: "get-project-member-tool",
//         arguments: JSON.stringify({
//           projectId: "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3",
//           userId: "U0AC0M1S90W",
//         }),
//       },
//     },
//     {
//       id: "call_object_003",
//       function: {
//         name: "ingest-updates-workflow",
//         arguments: JSON.stringify({
//           projectId: "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3",
//           public: { text: "The new knowledge base integration for the Slack bot is encountering retrieval latency. The vector embeddings in the database must be re-indexed before the upcoming Friday deployment." },
//         }),
//       },
//     },
//   ];

//   console.log("Starting tool execution tests...");
  
//   try {
//     for (const toolCall of testToolCalls) {
//       const results = await executeTools([toolCall]);
//       console.log(JSON.stringify(results, null, 2));
//     }
//     console.log("Test execution completed successfully.");
//   } catch (error) {
//     console.error("Test execution failed:", error);
//   }
// }

// // Uncomment the line below to run the tests locally
// testExecuteTools();

export default executeTools;