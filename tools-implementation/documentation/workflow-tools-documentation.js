const workflowTools = [
  {
    type: "function",
    function: {
      name: "create_project_workflow_tool",
      description: "Creates a new project and performs all required setup, including creating the user if needed, assigning the creator as project manager, linking the project to the thread when applicable, and updating caches. Use when a user requests creation of a new project. Do not manually recreate this workflow using individual project creation tools.",
      parameters: {
        type: "object",
        properties: {
          userId: {
            type: "string",
            description: "Slack user ID of the project creator."
          },
          projectName: {
            type: "string",
            description: "Name of the project to create."
          },
          threadId: {
            type: "string",
            description: "Thread ID to associate with the project when applicable."
          }
        },
        required: [
          "userId",
          "projectName"
        ]
      }
    }
  }
];

export default workflowTools;