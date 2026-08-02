const atomicTools = [
  {
    // DATABASE TOOL
    type: "function",
    function: {
      name: "create_canvas_for_channel_tool",
      description: "Associates Slack canvas IDs with existing channels in the system. Use when a canvas has already been created in Slack and needs to be linked to one or more channels. Do not use to create channels or canvases, as this tool only stores the association.",
      parameters: {
        type: "object",
        properties: {
          channelCanvasPairs: {
            type: "array",
            description: "Array of channel and canvas ID pairs to associate.",
            items: {
              type: "object",
              properties: {
                channelId: {
                  type: "string",
                  description: "Slack channel ID."
                },
                canvasId: {
                  type: "string",
                  description: "Slack canvas ID to associate with the channel."
                }
              },
              required: [
                "channelId",
                "canvasId"
              ]
            }
          }
        },
        required: [
          "channelCanvasPairs"
        ]
      }
    }
  },
  {
    // DATABASE TOOL
    type: "function",
    function: {
      name: "fetch_canvas_for_channel_tool",
      description: "Fetches canvas IDs associated with one or more channels from the database. Use when canvas information for existing channels is required. Do not use to retrieve data directly from Slack or to create or modify channel-canvas associations. This is a database lookup tool and does not interact with Slack.",
      parameters: {
        type: "object",
        properties: {
          channelIds: {
            type: "array",
            description: "Array of Slack channel IDs.",
            items: {
              type: "string"
            }
          }
        },
        required: [
          "channelIds"
        ]
      }
    }
  },
  {
    // DATABASE TOOL
    type: "function",
    function: {
      name: "link_projects_to_channel_tool",
      description: "Links one or more existing Slack channels to a project in the database. Use when channels already exist on Slack and need to be associated with a project in the system. Do not use to create Slack channels or modify channels. Ensure the channels have been successfully created or already exist on Slack before calling this tool.",
      parameters: {
        type: "object",
        properties: {
          projectId: {
            type: "string",
            description: "Unique identifier of the project."
          },
          channels: {
            type: "array",
            description: "List of Slack channels to associate with the project.",
            items: {
              type: "object",
              properties: {
                channelId: {
                  type: "string",
                  description: "Slack channel ID."
                },
                name: {
                  type: "string",
                  description: "Slack channel name."
                },
                isPrivate: {
                  type: "boolean",
                  description: "Whether the channel is private."
                }
              },
              required: [
                "channelId",
                "name",
                "isPrivate"
              ]
            }
          }
        },
        required: [
          "projectId",
          "channels"
        ]
      }
    }
  },
  {
    // DATABASE TOOL
    type: "function",
    function: {
      name: "validate_project_channels_tool",
      description: "Validates whether specified channels belong to a project and returns valid and invalid channel IDs. Use when channel ownership within a project needs to be verified before performing project-specific operations. Do not use to create, modify, or link channels.",
      parameters: {
        type: "object",
        properties: {
          projectId: {
            type: "string",
            description: "Unique identifier of the project."
          },
          channelIds: {
            type: "array",
            description: "List of channel IDs to validate.",
            items: {
              type: "string"
            }
          }
        },
        required: [
          "projectId",
          "channelIds"
        ]
      }
    }
  },
  {
    type: "function",
    function: {
        // DATABASE TOOL
      name: "create_documents_tool",
      description: "Creates database records for documents associated with a project. Use when document metadata needs to be stored after documents have been successfully ingested into the context retrieval system. Do not use to ingest documents or update existing document records. Ensure document ingestion has completed successfully before calling this tool.",
      parameters: {
        type: "object",
        properties: {
          documents: {
            type: "array",
            description: "List of documents to create.",
            items: {
              type: "object",
              properties: {
                documentId: {
                  type: "string",
                  description: "Unique document identifier."
                },
                name: {
                  type: "string",
                  description: "Document name."
                },
                link: {
                  type: "string",
                  description: "Document link or URL."
                },
                projectId: {
                  type: "string",
                  description: "Project identifier."
                },
                slackMemberId: {
                  type: "string",
                  description: "Slack member who uploaded the document."
                },
                isPrivate: {
                  type: "boolean",
                  description: "Whether the document is private."
                }
              },
              required: [
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
        required: [
          "documents"
        ]
      }
    }
  },
  {
    // DATABASE TOOL
    type: "function",
    function: {
      name: "delete_documents_tool",
      description: "Deletes document records from the database. Use when document metadata needs to be removed from the system. Do not use to delete document context. Ensure the context deletion API tool is used to delete document context before calling this tool.",
      parameters: {
        type: "object",
        properties: {
          documentIds: {
            type: "array",
            description: "Array of document IDs to delete.",
            items: {
              type: "string"
            }
          }
        },
        required: [
          "documentIds"
        ]
      }
    }
  },
  {
    // DATABASE TOOL
    type: "function",
    function: {
      name: "link_project_to_thread_tool",
      description: "Links a Slack thread to a project in the database. Use when a project association needs to be stored for a private DM thread or group chat thread. Do not use for channel conversations. Only use this tool when the request originates from a conversation whose channel ID starts with 'D' or 'G'. Never use this tool when the channel ID starts with 'C'.",
      parameters: {
        type: "object",
        properties: {
          projectId: {
            type: "string",
            description: "Unique identifier of the project."
          },
          threadId: {
            type: "string",
            description: "Slack thread identifier."
          }
        },
        required: [
          "projectId",
          "threadId"
        ]
      }
    }
  },
  {
    // DATABASE TOOL
  type: "function",
  function: {
    name: "fetch_documents_for_project_tool",
    description: "Fetches all documents associated with a project from the database. Use when project document metadata or the list of ingested documents is required. Do not use to retrieve document content or context from the vector database. This is a database lookup tool.",
    parameters: {
      type: "object",
      properties: {
        projectId: {
          type: "string",
          description: "Unique identifier of the project."
        }
      },
      required: [
        "projectId"
      ]
    }
  }
},
    {
        // DATABASE TOOL
  type: "function",
  function: {
    name: "fetch_documents_tool",
    description: "Fetches document records from the database for the specified document IDs. Use when document metadata for one or more known documents is required. Do not use unless the document IDs are already available. Always provide the document IDs as an array, even when fetching a single document. This is a database lookup tool.",
    parameters: {
      type: "object",
      properties: {
        documentIds: {
          type: "array",
          description: "Array of document IDs to fetch. Always provide an array, even for a single document ID.",
          items: {
            type: "string"
          }
        }
      },
      required: [
        "documentIds"
      ]
    }
  }
},
    {
        // DATABASE TOOL
  type: "function",
  function: {
    name: "change_project_member_roles_tool",
    description: "Changes the roles of project members in the database. Prefer using the change member roles workflow instead of this tool whenever possible, and use this tool only if the workflow cannot be used. Do not use to add or remove project members. After successfully changing member roles, always call the invalidate_project_member_cache_tool to invalidate the affected project member cache.",
    parameters: {
      type: "object",
      properties: {
        users: {
          type: "array",
          description: "Array of project members whose roles need to be updated.",
          items: {
            type: "object",
            properties: {
              projectId: {
                type: "string",
                description: "Unique identifier of the project."
              },
              userId: {
                type: "string",
                description: "Slack user ID of the project member."
              },
              role: {
                type: "string",
                description: "New role to assign. Allowed values are 'manager' and 'member'.",
                enum: [
                  "manager",
                  "member"
                ]
              }
            },
            required: [
              "projectId",
              "userId",
              "role"
            ]
          }
        }
      },
      required: [
        "users"
      ]
    }
  }
},
    {
        // DATABASE TOOL
  type: "function",
  function: {
    name: "create_project_tool",
    description: "Creates a new project in the database. Prefer using the create project workflow instead of this tool whenever possible, and use this tool only if the workflow cannot be used. Do not use this tool to perform complete project setup. After successfully creating the project, always link the creator to the project using the project member tool and assign them the 'manager' role.",
    parameters: {
      type: "object",
      properties: {
        projectName: {
          type: "string",
          description: "Name of the project to create."
        },
        creatorSlackId: {
          type: "string",
          description: "Slack user ID of the project creator."
        }
      },
      required: [
        "projectName",
        "creatorSlackId"
      ]
    }
  }
},
    {
        // DATABASE TOOL
  type: "function",
  function: {
    name: "fetch_channels_for_project_tool",
    description: "Fetches all channels associated with a project from the database. Use when channel information for a known project is required. Do not use to retrieve channel information directly from Slack. This is a database lookup tool.",
    parameters: {
      type: "object",
      properties: {
        projectId: {
          type: "string",
          description: "Unique identifier of the project."
        }
      },
      required: [
        "projectId"
      ]
    }
  }
},
    {
        // DATABASE TOOL
  type: "function",
  function: {
    name: "link_project_to_users_tool",
    description: "Links one or more users to a project in the database. Prefer using the add project members workflow instead of this tool whenever possible, and use this tool only if the workflow cannot be used. Do not use to create users or projects. After successfully linking users to the project, always call invalidateProjectUsers and invalidateUserProjects to invalidate the affected caches.",
    parameters: {
      type: "object",
      properties: {
        projectId: {
          type: "string",
          description: "Unique identifier of the project."
        },
        users: {
          type: "array",
          description: "Array of users to link to the project.",
          items: {
            type: "object",
            properties: {
              userId: {
                type: "string",
                description: "Slack user ID."
              },
              role: {
                type: "string",
                description: "Role to assign to the user in the project.",
                enum: [
                  "manager",
                  "member"
                ]
              }
            },
            required: [
              "userId",
              "role"
            ]
          }
        }
      },
      required: [
        "projectId",
        "users"
      ]
    }
  }
},
    {
        // DATABASE TOOL
  type: "function",
  function: {
    name: "remove_users_from_project_tool",
    description: "Removes one or more users from a project in the database. Prefer using the remove_members_from_project_workflow workflow instead of this tool whenever possible, and use this tool only if the workflow cannot be used. Do not use to delete users from the system. After successfully removing users from the project, always call invalidateProjectUsers and invalidateUserProjects to invalidate the affected caches.",
    parameters: {
      type: "object",
      properties: {
        projectId: {
          type: "string",
          description: "Unique identifier of the project."
        },
        userIds: {
          type: "array",
          description: "Array of Slack user IDs to remove from the project.",
          items: {
            type: "string"
          }
        }
      },
      required: [
        "projectId",
        "userIds"
      ]
    }
  }
},
    {
        // DATABASE TOOL
  type: "function",
  function: {
    name: "update_project_names_tool",
    description: "Updates the names of one or more projects in the database. Use when the name of an existing project needs to be changed. Do not use to create or delete projects. After successfully updating project names, always call invalidateUserProjects to invalidate the affected user project caches.",
    parameters: {
      type: "object",
      properties: {
        projects: {
          type: "array",
          description: "Array of projects whose names need to be updated.",
          items: {
            type: "object",
            properties: {
              projectId: {
                type: "string",
                description: "Unique identifier of the project."
              },
              projectName: {
                type: "string",
                description: "New name for the project."
              }
            },
            required: [
              "projectId",
              "projectName"
            ]
          }
        }
      },
      required: [
        "projects"
      ]
    }
  }
},
    {
        // DATABASE TOOL
  type: "function",
  function: {
    name: "create_users_tool",
    description: "Creates one or more users in the database if they do not already exist. Use when new users need to be added to the system. Do not pass email addresses to this tool. Always provide Slack member IDs, and if only email addresses are available, first use the find_user_by_email_tool to resolve them to Slack member IDs before calling this tool.",
    parameters: {
      type: "object",
      properties: {
        users: {
          type: "array",
          description: "Array of Slack member IDs of the users to create.",
          items: {
            type: "string"
          }
        }
      },
      required: [
        "users"
      ]
    }
  }
},
    {
        // DATABASE TOOL
  type: "function",
  function: {
    name: "fetch_user_tool",
    description: "Fetches a user from the database using their Slack member ID. Use when user information for a known Slack member is required. Do not pass email addresses to this tool. Always provide the Slack member ID, and if only an email address is available, first use the find_user_by_email_tool to resolve it to a Slack member ID before calling this tool.",
    parameters: {
      type: "object",
      properties: {
        slackMemberId: {
          type: "string",
          description: "Slack member ID of the user."
        }
      },
      required: [
        "slackMemberId"
      ]
    }
  }
},
    {
        // FILES TOOL
  type: "function",
  function: {
    name: "extract_file_content_tool",
description: "Downloads one or more files and extracts their textual content into a single string. Use when document content is required from one or more files for ingestion, retrieval, summarization, or further processing. Supports only PDF, DOCX, TXT, and XLSX files. Supports only directly uploaded Slack files and Google Drive file links. Do not pass any other file URLs or Google Workspace document links (Docs, Sheets, Slides) that are not Google Drive file links. Do not use for unsupported file types.",    parameters: {
      type: "object",
      properties: {
        files: {
          type: "array",
          description: "Array of files whose content needs to be extracted.",
          items: {
            type: "object",
            properties: {
              source: {
                type: "string",
                description: "Source of the file.",
                enum: [
                  "slack",
                  "gdrive"
                ]
              },
              fileLink: {
                type: "string",
                description: "Slack private download URL or Google Drive file URL."
              },
              document_name: {
                type: "string",
                description: "Document name. Required only for Slack files."
              },
              document_type: {
                type: "string",
                description: "Document type. Required only for Slack files. Supported values are pdf, docx, txt and xlsx."
              }
            },
            required: [
              "source",
              "fileLink"
            ]
          }
        }
      },
      required: [
        "files"
      ]
    }
  }
},
    {
        // SLACK TOOL
  type: "function",
  function: {
    name: "add_members_to_channel_tool",
    description: "Adds one or more members to a Slack channel. Prefer using the add_members_to_channel_workflow instead of this tool whenever possible, and use this tool only if the workflow cannot be used. Before adding members, always validate that the channel belongs to the target project by calling validate_project_channels_tool. Do not use this tool for channels that are not associated with the project.",
    parameters: {
      type: "object",
      properties: {
        channel: {
          type: "string",
          description: "Slack channel ID of the channel to which members should be added."
        },
        userIds: {
          type: "array",
          description: "Array of Slack member IDs to add to the channel.",
          items: {
            type: "string"
          }
        }
      },
      required: [
        "channel",
        "userIds"
      ]
    }
  }
},
    
  {
    // CACHE TOOL
    type: "function",
    function: {
      name: "get_user_projects_tool",
      description: "Retrieves the list of projects a user belongs to. Use when a project-specific request is received in a DM or group chat(channel ID starts with 'G' or 'D') and the target project cannot be determined from the conversation context. Do not use when the project has already been identified. If multiple projects are returned and the intended project is unclear, ask the user which project they are referring to.",
      parameters: {
        type: "object",
        properties: {
          userId: {
            type: "string",
            description: "Slack user ID."
          }
        },
        required: [
          "userId"
        ]
      }
    }
  }
];

export default atomicTools;