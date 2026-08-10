const memberAgentTools = [
  {
    "type": "function",
    "function": {
      "name": "create-users-tool",
      "description": "Creates one or more users in the database if they do not already exist. Use when new users need to be added to the system. Do not pass email addresses to this tool. Always provide Slack member IDs, and if only email addresses are available, first use the find_user_by_email_tool to resolve them to Slack member IDs before calling this tool.",
      "parameters": {
        "type": "object",
        "properties": {
          "users": {
            "type": "array",
            "description": "Array of Slack member IDs of the users to create.",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "users"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "fetch-user-tool",
      "description": "Fetches a user from the database using their Slack member ID. Use when user information for a known Slack member is required. Do not pass email addresses to this tool. Always provide the Slack member ID, and if only an email address is available, first use the find_user_by_email_tool to resolve it to a Slack member ID before calling this tool.",
      "parameters": {
        "type": "object",
        "properties": {
          "slackMemberId": {
            "type": "string",
            "description": "Slack member ID of the user."
          }
        },
        "required": [
          "slackMemberId"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "extract-file-content-tool",
      "description": "Downloads one or more files and extracts their textual content into a single string. Use when document content is required from one or more files for ingestion, retrieval, summarization, or further processing. Supports only PDF, DOCX, TXT, and XLSX files. Supports only directly uploaded Slack files and Google Drive file links. Do not pass any other file URLs or Google Workspace document links (Docs, Sheets, Slides) that are not Google Drive file links. Do not use for unsupported file types.",
      "parameters": {
        "type": "object",
        "properties": {
          "files": {
            "type": "array",
            "description": "Array of files whose content needs to be extracted.",
            "items": {
              "type": "object",
              "properties": {
                "source": {
                  "type": "string",
                  "description": "Source of the file.",
                  "enum": [
                    "slack",
                    "gdrive"
                  ]
                },
                "fileLink": {
                  "type": "string",
                  "description": "Slack private download URL or Google Drive file URL."
                },
                "document_name": {
                  "type": "string",
                  "description": "Document name. Required only for Slack files."
                },
                "document_type": {
                  "type": "string",
                  "description": "Document type. Required only for Slack files. Supported values are pdf, docx, txt and xlsx."
                }
              },
              "required": [
                "source",
                "fileLink"
              ]
            }
          }
        },
        "required": [
          "files"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "find-users-by-email-tool",
      "description": "Finds Slack users using their email addresses and returns their corresponding Slack member IDs. Use when Slack member IDs are required but only email addresses are available. Do not use if the Slack member IDs are already known.",
      "parameters": {
        "type": "object",
        "properties": {
          "emails": {
            "type": "array",
            "description": "Array of email addresses to look up.",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "emails"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "get-user-projects-tool",
      "description": "Retrieves the list of projects a user belongs to. Use when a project-specific request is received in a DM or group chat(channel ID starts with 'G' or 'D') and the target project cannot be determined from the conversation context. Do not use when the project has already been identified. If multiple projects are returned and the intended project is unclear, ask the user which project they are referring to.",
      "parameters": {
        "type": "object",
        "properties": {
          "userId": {
            "type": "string",
            "description": "Slack user ID."
          }
        },
        "required": [
          "userId"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "retrieval-private-workflow",
      "description": "Retrieves relevant context from the project's knowledge base. Prefer using this workflow whenever a user asks a project-specific question that requires information from the stored project context. Pass only the user's main query as the retrieval query. Do not include previous conversation history, assistant responses, or any additional context in the query. This workflow only retrieves relevant context and does not generate the final answer. Use the retrieved context to formulate the response.",
      "parameters": {
        "type": "object",
        "properties": {
          "query": {
            "type": "string",
            "description": "The user's main query to retrieve relevant project context."
          },
          "projectId": {
            "type": "string",
            "description": "Project ID."
          }
        },
        "required": [
          "query",
          "projectId"
        ]
      }
    }
  }
]

export default memberAgentTools;