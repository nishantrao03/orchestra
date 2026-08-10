const managerAgentWorkflows = [
  {
    "type": "function",
    "function": {
      "name": "add-members-to-channels-workflow",
      "description": "Adds one or more users to one or more Slack channels within a project. Prefer using this workflow over the underlying atomic tools whenever users need to be added to project channels. Before executing this workflow, ensure the target channels already exist. If they do not exist, first use create_channels_workflow. Never assume that channel membership implies project membership. If the user explicitly requests that users be added to the project, first execute add_members_to_project_workflow for only those users, and then execute this workflow. Always provide Slack member IDs as input. If only email addresses are available, first resolve them to Slack member IDs using find_users_by_email_tool before calling this workflow. This workflow automatically validates that every channel belongs to the specified project before adding members.",
      "parameters": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "string",
            "description": "Project ID."
          },
          "channels": {
            "type": "array",
            "description": "Array of project channels and the Slack members to add to each channel.",
            "items": {
              "type": "object",
              "properties": {
                "channelId": {
                  "type": "string",
                  "description": "Slack channel ID."
                },
                "userIds": {
                  "type": "array",
                  "description": "Array of Slack member IDs to add to the channel.",
                  "items": {
                    "type": "string"
                  }
                }
              },
              "required": [
                "channelId",
                "userIds"
              ]
            }
          }
        },
        "required": [
          "projectId",
          "channels"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "add-members-to-project-workflow",
      "description": "Adds one or more users to a project. Prefer using this workflow whenever users need to be added to a project. Always provide Slack member IDs as input. If only email addresses are available, first resolve them using find_users_by_email_tool. This workflow only grants project membership and does not add users to any project channels. If the user also requests channel access, execute add_members_to_channels_workflow after this workflow.",
      "parameters": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "string",
            "description": "Project ID."
          },
          "users": {
            "type": "array",
            "description": "Array of users to add to the project.",
            "items": {
              "type": "object",
              "properties": {
                "userId": {
                  "type": "string",
                  "description": "Slack member ID of the user."
                },
                "role": {
                  "type": "string",
                  "description": "Project role to assign. Supported values are 'manager' and 'member'."
                }
              },
              "required": [
                "userId",
                "role"
              ]
            }
          }
        },
        "required": [
          "projectId",
          "users"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "change-project-member-roles-workflow",
      "description": "Changes the roles of one or more existing project members. Prefer using this workflow whenever project member roles need to be updated. Only use this workflow when the user explicitly requests a role change. This workflow only changes member roles and does not add or remove users from the project. Use the corresponding member management workflows for adding or removing project members.",
      "parameters": {
        "type": "object",
        "properties": {
          "users": {
            "type": "array",
            "description": "Array of project member role changes.",
            "items": {
              "type": "object",
              "properties": {
                "projectId": {
                  "type": "string",
                  "description": "Project ID."
                },
                "userId": {
                  "type": "string",
                  "description": "Slack member ID of the user."
                },
                "role": {
                  "type": "string",
                  "description": "New project role. Supported values are 'manager' and 'member'."
                }
              },
              "required": [
                "projectId",
                "userId",
                "role"
              ]
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
      "name": "create-canvas-for-channel-workflow",
      "description": "Creates a Slack canvas for a project channel. Prefer using this workflow whenever a channel canvas needs to be created. The content provided must be complete and ready to publish, as this workflow will not modify or generate any part of it. If the content contains links, ensure they are accessible to the intended project members. Links to private channels or other restricted resources should only be included if the user explicitly requests them.",
      "parameters": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "string",
            "description": "Project ID."
          },
          "channelId": {
            "type": "string",
            "description": "Slack channel ID where the canvas should be created."
          },
          "content": {
            "type": "string",
            "description": "Complete canvas content to publish."
          }
        },
        "required": [
          "projectId",
          "channelId",
          "content"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "create-channels-workflow",
      "description": "Creates one or more Slack channels for a project. Prefer using this workflow whenever new project channels need to be created. Ensure all channel names are valid Slack channel names. This workflow only creates the channels and associates them with the project. If users other than the creator should also be added to the newly created channels, execute add_members_to_channels_workflow after this workflow.",
      "parameters": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "string",
            "description": "Project ID."
          },
          "userId": {
            "type": "string",
            "description": "Slack member ID of the project creator."
          },
          "channels": {
            "type": "array",
            "description": "Array of Slack channels to create.",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "description": "Valid Slack channel name."
                },
                "isPrivate": {
                  "type": "boolean",
                  "description": "Whether the channel should be private."
                }
              },
              "required": [
                "name",
                "isPrivate"
              ]
            }
          }
        },
        "required": [
          "projectId",
          "userId",
          "channels"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "create-project-workflow",
      "description": "Creates a new project and performs all required setup, including creating the user if needed, assigning the creator as project manager, linking the project to the thread when applicable, and updating caches. Use when a user requests creation of a new project. Do not manually recreate this workflow using individual project creation tools.",
      "parameters": {
        "type": "object",
        "properties": {
          "userId": {
            "type": "string",
            "description": "Slack user ID of the project creator."
          },
          "projectName": {
            "type": "string",
            "description": "Name of the project to create."
          },
          "threadId": {
            "type": "string",
            "description": "Thread ID to associate with the project when applicable."
          }
        },
        "required": [
          "userId",
          "projectName"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "delete-context-workflow",
      "description": "Deletes one or more documents and their associated project context. Prefer using this workflow whenever project documents need to be permanently removed. Always provide document IDs as input. If the user specifies document names instead of IDs, first retrieve the project's documents and resolve the corresponding document IDs. Only pass the documents that the user explicitly requests to delete. This workflow automatically ignores document IDs that do not belong to the specified project.",
      "parameters": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "string",
            "description": "Project ID."
          },
          "documentIds": {
            "type": "array",
            "description": "Array of document IDs to permanently delete.",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "projectId",
          "documentIds"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "ingest-documents-workflow",
      "description": "Adds documents and/or text content to a project's knowledge base. Prefer using this workflow whenever new project knowledge needs to be ingested. For Slack files, always provide url_private_download and never use url_private, permalink, or permalink_public. Supported file sources are Slack files and Google Drive file links only. Set the privacy flags correctly, as they determine the visibility of the ingested content during retrieval. At least one of fileUrls or textContent must be provided.",
      "parameters": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "string",
            "description": "Project ID."
          },
          "slackMemberId": {
            "type": "string",
            "description": "Slack member ID of the user performing the ingestion."
          },
          "fileUrls": {
            "type": "array",
            "description": "Array of files to ingest.",
            "items": {
              "type": "object",
              "properties": {
                "fileUrl": {
                  "type": "string",
                  "description": "Slack url_private_download URL or a Google Drive file link."
                },
                "is_private": {
                  "type": "boolean",
                  "description": "Whether the file should be private during retrieval."
                }
              },
              "required": [
                "fileUrl",
                "is_private"
              ]
            }
          },
          "textContent": {
            "type": "string",
            "description": "Text content to ingest into the project knowledge base."
          },
          "isTextContentPrivate": {
            "type": "boolean",
            "description": "Whether the text content should be private during retrieval."
          }
        },
        "required": [
          "projectId",
          "slackMemberId"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "ingest-updates-workflow",
      "description": "Adds incremental updates to an existing project's knowledge base. Use this workflow only when the user is providing updates to existing project knowledge, either as text or supporting files. Do not use this workflow for first-time project documents or initial project knowledge; use ingest_documents_workflow instead. For file-based updates, only use this workflow if the user explicitly indicates that the files contain project updates. Public and private updates must already be separated before calling this workflow, as it does not determine update visibility. Supported file sources are Slack files and Google Drive file links only. For Slack files, always provide url_private_download and never use url_private, permalink, or permalink_public.",
      "parameters": {
        "type": "object",
        "properties": {
          "public": {
            "type": "object",
            "description": "Public project updates.",
            "properties": {
              "text": {
                "type": "string",
                "description": "Public update text."
              },
              "files": {
                "type": "array",
                "description": "Array of Slack url_private_download URLs or Google Drive file links containing public updates.",
                "items": {
                  "type": "string"
                }
              }
            }
          },
          "private": {
            "type": "object",
            "description": "Private project updates.",
            "properties": {
              "text": {
                "type": "string",
                "description": "Private update text."
              },
              "files": {
                "type": "array",
                "description": "Array of Slack url_private_download URLs or Google Drive file links containing private updates.",
                "items": {
                  "type": "string"
                }
              }
            }
          },
          "projectId": {
            "type": "string",
            "description": "Project ID."
          }
        },
        "required": [
          "projectId"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "retrieval-public-workflow",
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
  },
  {
    "type": "function",
    "function": {
      "name": "remove-members-from-channels-workflow",
      "description": "Removes one or more users from project channels. Prefer using this workflow whenever users need to be removed from Slack channels belonging to a project. Always provide Slack member IDs as input. If only email addresses are available, first resolve them using find_users_by_email_tool. This workflow only removes users from the specified channels and does not remove them from the project. If the user also requests removal from the project itself, execute remove_members_from_project_workflow after this workflow.",
      "parameters": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "string",
            "description": "Project ID."
          },
          "channels": {
            "type": "array",
            "description": "Array of channels and the users to remove from each channel.",
            "items": {
              "type": "object",
              "properties": {
                "channelId": {
                  "type": "string",
                  "description": "Slack channel ID."
                },
                "userIds": {
                  "type": "array",
                  "description": "Array of Slack member IDs to remove from the channel.",
                  "items": {
                    "type": "string"
                  }
                }
              },
              "required": [
                "channelId",
                "userIds"
              ]
            }
          }
        },
        "required": [
          "projectId",
          "channels"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "remove-members-from-channels-workflow",
      "description": "Removes one or more users from project channels. Prefer using this workflow whenever users need to be removed from Slack channels belonging to a project. Always provide Slack member IDs as input. If only email addresses are available, first resolve them using find_users_by_email_tool. Only remove users from the channels explicitly specified by the user. Do not assume they should be removed from all project channels. If the user explicitly requests removal from all project channels, provide all project channel IDs as input to this workflow. Use this workflow only when the user's intent is to remove users from channels while retaining their project membership. If the user's intent is to revoke project access completely, use remove_members_from_project_workflow instead.",
      "parameters": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "string",
            "description": "Project ID."
          },
          "channels": {
            "type": "array",
            "description": "Array of channels and the users to remove from each channel.",
            "items": {
              "type": "object",
              "properties": {
                "channelId": {
                  "type": "string",
                  "description": "Slack channel ID."
                },
                "userIds": {
                  "type": "array",
                  "description": "Array of Slack member IDs to remove from the channel.",
                  "items": {
                    "type": "string"
                  }
                }
              },
              "required": [
                "channelId",
                "userIds"
              ]
            }
          }
        },
        "required": [
          "projectId",
          "channels"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "remove-members-from-project-workflow",
      "description": "Removes one or more users from a project. Prefer using this workflow whenever users need to be removed from a project. Always provide Slack member IDs as input. If only email addresses are available, first resolve them using find_users_by_email_tool. This workflow also removes the users from all channels belonging to the project. Use this workflow when the user's intent is to revoke project access completely.",
      "parameters": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "string",
            "description": "Project ID."
          },
          "userIds": {
            "type": "array",
            "description": "Array of Slack member IDs to remove from the project.",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "projectId",
          "userIds"
        ]
      }
    }
  }
]

export default managerAgentWorkflows;