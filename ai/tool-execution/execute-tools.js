// import toolRegistry
//   from "./tool-registry.js";

// /**
//  * Execute tool calls requested by the LLM.
//  *
//  * @param {Array} toolCalls
//  * @returns {Promise<Array>}
//  */
// async function executeTools(
//   toolCalls
// ) {

//   if (
//     !Array.isArray(
//       toolCalls
//     )
//   ) {
//     throw new Error(
//       "toolCalls must be an array."
//     );
//   }

//   const toolResults = [];

//   for (
//     const toolCall
//     of toolCalls
//   ) {
//     try {
//       const toolName =
//         toolCall?.function
//           ?.name;

//       if (
//         !toolName
//       ) {
//         throw new Error(
//           "Tool name is missing."
//         );
//       }

//       const tool =
//         toolRegistry[
//           toolName
//         ];

//       if (!tool) {
//         throw new Error(
//           `Unknown tool: ${toolName}`
//         );
//       }

//       let toolArguments =
//         {};

//       const rawArguments =
//         toolCall?.function
//           ?.arguments;

//       if (
//         rawArguments
//       ) {
//         try {
//           toolArguments =
//             JSON.parse(
//               rawArguments
//             );
//         } catch (error) {
//           throw new Error(
//             `Failed to parse arguments for ${toolName}: ${error.message}`
//           );
//         }
//       }

//       const result =
//         await tool(
//           toolArguments
//         );

//         console.log(result);

//       toolResults.push({
//         toolCallId:
//           toolCall.id,

//         toolName,

//         success:
//           true,

//         result,
//       });
//     } catch (error) {
//       toolResults.push({
//         toolCallId:
//           toolCall?.id ??
//           null,

//         toolName:
//           toolCall?.function
//             ?.name ??
//           null,

//         success:
//           false,

//         error:
//           error.message,
//       });
//     }
//   }

//   return toolResults;
// }

// export default executeTools;

import toolRegistry
  from "./tool-registry.js";

/**
 * Execute tool calls requested by the LLM.
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

      const tool =
        toolRegistry[
          toolName
        ];

      if (!tool) {
        throw new Error(
          `Unknown tool: ${toolName}`
        );
      }

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

      const argumentValues =
        Object.values(
          toolArguments
        );

      if (
        argumentValues.length ===
        0
      ) {
        result =
          await tool();
      } else if (
        argumentValues.length ===
        1
      ) {
        result =
          await tool(
            argumentValues[0]
          );
      } else {
        result =
          await tool(
            toolArguments
          );
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

export default executeTools;