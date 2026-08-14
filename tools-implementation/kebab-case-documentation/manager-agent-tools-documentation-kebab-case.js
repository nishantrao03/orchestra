const managerAgentTools = [
  {
    "type": "function",
    "function": {
      "name": "create-canvas-for-channel-tool",
      "description": "Associates Slack canvas IDs with existing channels in the system. Use when a canvas has already been created in Slack and needs to be linked to one or more channels. Do not use to create channels or canvases, as this tool only stores the association.",
      "parameters": {
        "type": "object",
        "properties": {
          "channelCanvasPairs": {
            "type": "array",
            "description": "Array of channel and canvas ID pairs to associate.",
            "items": {
              "type": "object",
              "properties": {
                "channelId": {
                  "type": "string",
                  "description": "Slack channel ID."
                },
                "canvasId": {
                  "type": "string",
                  "description": "Slack canvas ID to associate with the channel."
                }
              },
              "required": [
                "channelId",
                "canvasId"
              ]
            }
          }
        },
        "required": [
          "channelCanvasPairs"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "fetch-canvas-for-channel-tool",
      "description": "Fetches canvas IDs associated with one or more channels from the database. Use when canvas information for existing channels is required. Do not use to retrieve data directly from Slack or to create or modify channel-canvas associations. This is a database lookup tool and does not interact with Slack.",
      "parameters": {
        "type": "object",
        "properties": {
          "channelIds": {
            "type": "array",
            "description": "Array of Slack channel IDs.",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "channelIds"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "link-projects-to-channel-tool",
      "description": "Links one or more existing Slack channels to a project in the database. Use when channels already exist on Slack and need to be associated with a project in the system. Do not use to create Slack channels or modify channels. Ensure the channels have been successfully created or already exist on Slack before calling this tool.",
      "parameters": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "string",
            "description": "Unique identifier of the project."
          },
          "channels": {
            "type": "array",
            "description": "List of Slack channels to associate with the project.",
            "items": {
              "type": "object",
              "properties": {
                "channelId": {
                  "type": "string",
                  "description": "Slack channel ID."
                },
                "name": {
                  "type": "string",
                  "description": "Slack channel name."
                },
                "isPrivate": {
                  "type": "boolean",
                  "description": "Whether the channel is private."
                }
              },
              "required": [
                "channelId",
                "name",
                "isPrivate"
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
      "name": "validate-project-channels-tool",
      "description": "Validates whether specified channels belong to a project and returns valid and invalid channel IDs. Use when channel ownership within a project needs to be verified before performing project-specific operations. Do not use to create, modify, or link channels.",
      "parameters": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "string",
            "description": "Unique identifier of the project."
          },
          "channelIds": {
            "type": "array",
            "description": "List of channel IDs to validate.",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "projectId",
          "channelIds"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "create-documents-tool",
      "description": "Creates database records for documents associated with a project. Use when document metadata needs to be stored after documents have been successfully ingested into the context retrieval system. Do not use to ingest documents or update existing document records. Ensure document ingestion has completed successfully before calling this tool.",
      "parameters": {
        "type": "object",
        "properties": {
          "documents": {
            "type": "array",
            "description": "List of documents to create.",
            "items": {
              "type": "object",
              "properties": {
                "documentId": {
                  "type": "string",
                  "description": "Unique document identifier."
                },
                "name": {
                  "type": "string",
                  "description": "Document name."
                },
                "link": {
                  "type": "string",
                  "description": "Document link or URL."
                },
                "projectId": {
                  "type": "string",
                  "description": "Project identifier."
                },
                "slackMemberId": {
                  "type": "string",
                  "description": "Slack member who uploaded the document."
                },
                "isPrivate": {
                  "type": "boolean",
                  "description": "Whether the document is private."
                }
              },
              "required": [
                "documentId",
                "name",
                "link",
                "projectId",
                "slackMemberId",
                "isPrivate"
              ]
            }
          }
        },
        "required": [
          "documents"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "delete-documents-tool",
      "description": "Deletes document records from the database. Use when document metadata needs to be removed from the system. Do not use to delete document context. Ensure the context deletion API tool is used to delete document context before calling this tool.",
      "parameters": {
        "type": "object",
        "properties": {
          "documentIds": {
            "type": "array",
            "description": "Array of document IDs to delete.",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "documentIds"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "fetch-documents-for-project-tool",
      "description": "Fetches all documents associated with a project from the database. Use when project document metadata or the list of ingested documents is required. Do not use to retrieve document content or context from the vector database. This is a database lookup tool.",
      "parameters": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "string",
            "description": "Unique identifier of the project."
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
      "name": "fetch-documents-tool",
      "description": "Fetches document records from the database for the specified document IDs. Use when document metadata for one or more known documents is required. Do not use unless the document IDs are already available. Always provide the document IDs as an array, even when fetching a single document. This is a database lookup tool.",
      "parameters": {
        "type": "object",
        "properties": {
          "documentIds": {
            "type": "array",
            "description": "Array of document IDs to fetch. Always provide an array, even for a single document ID.",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "documentIds"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "change-project-member-roles-tool",
      "description": "Changes the roles of project members in the database. Prefer using the change member roles workflow instead of this tool whenever possible, and use this tool only if the workflow cannot be used. Do not use to add or remove project members. After successfully changing member roles, always call the invalidate_project_member_cache_tool to invalidate the affected project member cache.",
      "parameters": {
        "type": "object",
        "properties": {
          "users": {
            "type": "array",
            "description": "Array of project members whose roles need to be updated.",
            "items": {
              "type": "object",
              "properties": {
                "projectId": {
                  "type": "string",
                  "description": "Unique identifier of the project."
                },
                "userId": {
                  "type": "string",
                  "description": "Slack user ID of the project member."
                },
                "role": {
                  "type": "string",
                  "description": "New role to assign. Allowed values are 'manager' and 'member'.",
                  "enum": [
                    "manager",
                    "member"
                  ]
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
      "name": "fetch-channels-for-project-tool",
      "description": "Fetches all channels associated with a project from the database. Use when channel information for a known project is required. Do not use to retrieve channel information directly from Slack. This is a database lookup tool.",
      "parameters": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "string",
            "description": "Unique identifier of the project."
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
      "name": "link-project-to-users-tool",
      "description": "Links one or more users to a project in the database. Prefer using the add project members workflow instead of this tool whenever possible, and use this tool only if the workflow cannot be used. Do not use to create users or projects. After successfully linking users to the project, always call invalidateProjectUsers and invalidateUserProjects to invalidate the affected caches.",
      "parameters": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "string",
            "description": "Unique identifier of the project."
          },
          "users": {
            "type": "array",
            "description": "Array of users to link to the project.",
            "items": {
              "type": "object",
              "properties": {
                "userId": {
                  "type": "string",
                  "description": "Slack user ID."
                },
                "role": {
                  "type": "string",
                  "description": "Role to assign to the user in the project.",
                  "enum": [
                    "manager",
                    "member"
                  ]
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
      "name": "remove-users-from-project-tool",
      "description": "Removes one or more users from a project in the database. Prefer using the remove_members_from_project_workflow workflow instead of this tool whenever possible, and use this tool only if the workflow cannot be used. Do not use to delete users from the system. After successfully removing users from the project, always call invalidateProjectUsers and invalidateUserProjects to invalidate the affected caches.",
      "parameters": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "string",
            "description": "Unique identifier of the project."
          },
          "userIds": {
            "type": "array",
            "description": "Array of Slack user IDs to remove from the project.",
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
  },
  {
    "type": "function",
    "function": {
      "name": "update-project-names-tool",
      "description": "Updates the names of one or more projects in the database. Use when the name of an existing project needs to be changed. Do not use to create or delete projects. After successfully updating project names, always call invalidateUserProjects to invalidate the affected user project caches.",
      "parameters": {
        "type": "object",
        "properties": {
          "projects": {
            "type": "array",
            "description": "Array of projects whose names need to be updated.",
            "items": {
              "type": "object",
              "properties": {
                "projectId": {
                  "type": "string",
                  "description": "Unique identifier of the project."
                },
                "projectName": {
                  "type": "string",
                  "description": "New name for the project."
                }
              },
              "required": [
                "projectId",
                "projectName"
              ]
            }
          }
        },
        "required": [
          "projects"
        ]
      }
    }
  },
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
      "name": "add-members-to-channel-tool",
      "description": "Adds one or more members to a Slack channel. Prefer using the add_members_to_channel_workflow instead of this tool whenever possible, and use this tool only if the workflow cannot be used. Before adding members, always validate that the channel belongs to the target project by calling validate_project_channels_tool. Do not use this tool for channels that are not associated with the project.",
      "parameters": {
        "type": "object",
        "properties": {
          "channel": {
            "type": "string",
            "description": "Slack channel ID of the channel to which members should be added."
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
          "channel",
          "userIds"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "create-channel-canvas-tool",
      "description": "Creates a canvas for a Slack channel. Prefer using the create_canvas_for_channel_workflow instead of this tool whenever possible, and use this tool only if the workflow cannot be used. Before creating a canvas, always validate that the channel belongs to the target project by calling validate_project_channels_tool. After successfully creating the canvas, always call create_canvas_for_channel_tool to store the channel-canvas mapping in the database.",
      "parameters": {
        "type": "object",
        "properties": {
          "channelId": {
            "type": "string",
            "description": "Slack channel ID for which the canvas should be created."
          },
          "content": {
            "type": "string",
            "description": "Markdown content to initialize the channel canvas."
          }
        },
        "required": [
          "channelId",
          "content"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "create-channels-tool",
      "description": "Creates one or more Slack channels. Prefer using the create_channels_workflow instead of this tool whenever possible, and use this tool only if the workflow cannot be used. After successfully creating the channels on Slack, always call link_project_to_channels_tool to link the created channels with the corresponding project in the database.",
      "parameters": {
        "type": "object",
        "properties": {
          "channels": {
            "type": "array",
            "description": "Array of Slack channels to create.",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "description": "Name of the Slack channel to create."
                },
                "isPrivate": {
                  "type": "boolean",
                  "description": "Whether the channel should be private. Defaults to false if omitted."
                }
              },
              "required": [
                "name"
              ]
            }
          }
        },
        "required": [
          "channels"
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
      "name": "get-channel-history-tool",
      "description": "Fetches the latest messages from a Slack channel along with their thread replies. Use only when recent Slack conversations are specifically required or when the requested information is not expected to be available through the project context retrieval system. Before calling this tool, always validate that the channel belongs to the target project using validate_project_channels_tool. This tool retrieves only the latest 50 messages and their associated thread replies; it does not fetch the complete channel history.",
      "parameters": {
        "type": "object",
        "properties": {
          "channel": {
            "type": "string",
            "description": "Slack channel ID whose recent message history should be retrieved."
          }
        },
        "required": [
          "channel"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "post-message-in-thread-tool",
      "description": "Posts a message as a reply in an existing Slack thread. Use only when responding inside an existing thread. Do not use to start a new thread or post a normal channel message. Both the Slack channel ID and the parent thread timestamp must be available before calling this tool. Call this only after all required processing and tool calls have been completed, as this should typically be the final action.",
      "parameters": {
        "type": "object",
        "properties": {
          "channel": {
            "type": "string",
            "description": "Slack channel ID where the thread exists."
          },
          "threadTs": {
            "type": "string",
            "description": "Timestamp of the parent message that identifies the thread."
          },
          "text": {
            "type": "string",
            "description": "Message to post as a reply in the thread."
          }
        },
        "required": [
          "channel",
          "threadTs",
          "text"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "post-message-tool",
      "description": "Posts a message directly to a Slack channel. Use only when sending a new message to a channel and not as a reply to an existing thread. Do not use to reply inside a thread; use post_message_in_thread_tool instead. The Slack channel ID must be available before calling this tool. Call this only after all required processing and tool calls have been completed, as this should typically be the final action.",
      "parameters": {
        "type": "object",
        "properties": {
          "channel": {
            "type": "string",
            "description": "Slack channel ID where the message should be posted."
          },
          "text": {
            "type": "string",
            "description": "Message to post in the channel."
          }
        },
        "required": [
          "channel",
          "text"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "remove-members-from-channel-tool",
      "description": "Removes one or more members from a Slack channel. Prefer using the remove_members_from_channel_workflow instead of this tool whenever possible, and use this tool only if the workflow cannot be used. Before removing members, always validate that the channel belongs to the target project by calling validate_project_channels_tool. Always provide Slack member IDs, not email addresses or user names. If only email addresses are available, first use find_users_by_email_tool to resolve them to Slack member IDs before calling this tool.",
      "parameters": {
        "type": "object",
        "properties": {
          "channel": {
            "type": "string",
            "description": "Slack channel ID from which members should be removed."
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
          "channel",
          "userIds"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "get-thread-replies-tool",
      "description": "Fetches all messages belonging to an existing Slack thread. Use when the complete conversation within a specific thread is required. Do not use to retrieve normal channel messages; use get_channel_history_tool instead. Both the Slack channel ID and the thread timestamp must be available before calling this tool.",
      "parameters": {
        "type": "object",
        "properties": {
          "channel": {
            "type": "string",
            "description": "Slack channel ID containing the thread."
          },
          "threadTs": {
            "type": "string",
            "description": "Timestamp of the parent message that identifies the thread."
          }
        },
        "required": [
          "channel",
          "threadTs"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "get-channel-project-tool",
      "description": "Fetches the project ID associated with a Slack channel using the cache. Use when the project corresponding to a channel needs to be determined. This tool automatically falls back to the database on a cache miss and updates the cache before returning the result.",
      "parameters": {
        "type": "object",
        "properties": {
          "channelId": {
            "type": "string",
            "description": "Slack channel ID whose associated project ID should be retrieved."
          }
        },
        "required": [
          "channelId"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "invalidate-channel-project-tool",
      "description": "Invalidates the cached project mapping for a Slack channel. Use this tool whenever the project associated with a channel is created, removed, or changed to ensure future lookups return the latest data.",
      "parameters": {
        "type": "object",
        "properties": {
          "channelId": {
            "type": "string",
            "description": "Slack channel ID whose cached project mapping should be invalidated."
          }
        },
        "required": [
          "channelId"
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
      "name": "invalidate-user-projects-tool",
      "description": "Invalidates the cached list of projects associated with a Slack user. Use this tool whenever a user is added to or removed from a project to ensure future lookups return the latest project memberships.",
      "parameters": {
        "type": "object",
        "properties": {
          "userId": {
            "type": "string",
            "description": "Slack member ID whose cached project memberships should be invalidated."
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
      "name": "get-project-channels-tool",
      "description": "Fetches all channels associated with a project using the cache. Use when the list of project channels is required for validation, channel selection, or other project-related operations. This tool automatically falls back to the database on a cache miss and updates the cache before returning the result.",
      "parameters": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "string",
            "description": "Project ID whose associated channels should be retrieved."
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
      "name": "invalidate-project-channels-tool",
      "description": "Invalidates the cached channel list for a project. Use this tool whenever channels are removed from a project or when the cached channel information may no longer be valid.",
      "parameters": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "string",
            "description": "Project ID whose cached channel list should be invalidated."
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
      "name": "append-channels-to-project-tool",
      "description": "Appends newly created channels to the cached channel list of a project without invalidating the entire cache. Use this tool after successfully creating and linking new channels to a project to keep the cache synchronized. If the cache does not exist, it is automatically populated from the database.",
      "parameters": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "string",
            "description": "Project ID whose cached channel list should be updated."
          },
          "newChannels": {
            "type": "array",
            "description": "Array of newly created project channels to append to the cache.",
            "items": {
              "type": "object",
              "properties": {
                "channelId": {
                  "type": "string",
                  "description": "Slack channel ID."
                },
                "name": {
                  "type": "string",
                  "description": "Slack channel name."
                },
                "canvasId": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "description": "Canvas ID associated with the channel, if available."
                },
                "isPrivate": {
                  "type": "boolean",
                  "description": "Whether the Slack channel is private."
                }
              },
              "required": [
                "channelId",
                "name",
                "isPrivate"
              ]
            }
          }
        },
        "required": [
          "projectId",
          "newChannels"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "get-project-users-tool",
      "description": "Fetches all users associated with a project using the cache. Use when the list of project members and their roles is required for permission checks, member management, or project-related operations. This tool automatically falls back to the database on a cache miss and updates the cache before returning the result.",
      "parameters": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "string",
            "description": "Project ID whose associated users should be retrieved."
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
      "name": "invalidate-project-users-tool",
      "description": "Invalidates the cached user list for a project. Use this tool whenever users are added to, removed from, or their roles are changed within a project to ensure future lookups return the latest project membership information.",
      "parameters": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "string",
            "description": "Project ID whose cached user list should be invalidated."
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
      "name": "get-project-member-tool",
      "description": "Fetches a user's membership information for a project using the cache. Use when it is necessary to determine whether a user belongs to a project and, if so, their role within the project. This tool automatically falls back to the database on a cache miss and updates the cache before returning the result.",
      "parameters": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "string",
            "description": "Project ID."
          },
          "userId": {
            "type": "string",
            "description": "Slack member ID of the user."
          }
        },
        "required": [
          "projectId",
          "userId"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "is-project-member-tool",
      "description": "Checks whether a user is a member of a project. Use when only membership validation is required and the user's role is not needed.",
      "parameters": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "string",
            "description": "Project ID."
          },
          "userId": {
            "type": "string",
            "description": "Slack member ID of the user."
          }
        },
        "required": [
          "projectId",
          "userId"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "is-project-manager-tool",
      "description": "Checks whether a user is a manager of a project. Use when manager-level authorization needs to be verified before performing privileged project operations.",
      "parameters": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "string",
            "description": "Project ID."
          },
          "userId": {
            "type": "string",
            "description": "Slack member ID of the user."
          }
        },
        "required": [
          "projectId",
          "userId"
        ]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "invalidate-project-member-tool",
      "description": "Invalidates the cached membership information for a user in a project. Use this tool whenever a user's project membership is added, removed, or their role is changed to ensure future membership and authorization checks return the latest information.",
      "parameters": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "string",
            "description": "Project ID."
          },
          "userId": {
            "type": "string",
            "description": "Slack member ID of the user."
          }
        },
        "required": [
          "projectId",
          "userId"
        ]
      }
    }
  },  
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
      "description": "Creates one or more Slack channels for a project. Prefer using this workflow whenever new project channels need to be created. Ensure all channel names are valid Slack channel names. This workflow only creates the channels and associates them with the project. If users other than the creator should also be added to the newly created channels, execute add_members_to_channels_workflow after this workflow. By default, if it is not explicitly mentioned whether the channels should be private or public, assume they should be private and pass the isPrivate parameter as true.",
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

export default managerAgentTools;