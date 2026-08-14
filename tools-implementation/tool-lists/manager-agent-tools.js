/**
 * Returns a concise, formatted text list of all available Manager Agent tools and workflows.
 * Used to provide the Planner Agent with semantic mapping capabilities without overloading the context window.
 *
 * @returns {string} The formatted list of tools and descriptions.
 */
export default function getManagerAgentPlannerTools() {
    return `1. create-canvas-for-channel-tool: Associates Slack canvas IDs with existing channels in the database.
2. fetch-canvas-for-channel-tool: Fetches canvas IDs associated with channels from the database.
3. link-projects-to-channel-tool: Links existing Slack channels to a project in the database.
4. validate-project-channels-tool: Validates whether specified channels belong to a project.
5. create-documents-tool: Creates database records for ingested documents associated with a project.
6. delete-documents-tool: Deletes document metadata records from the database.
7. fetch-documents-for-project-tool: Fetches all document metadata associated with a project from the database.
8. fetch-documents-tool: Fetches specific document metadata records using their document IDs.
9. change-project-member-roles-tool: Changes the roles of project members in the database (use workflow instead if possible).
10. fetch-channels-for-project-tool: Fetches all channels associated with a project from the database.
11. link-project-to-users-tool: Links users to a project in the database (use workflow instead if possible).
12. remove-users-from-project-tool: Removes users from a project in the database (use workflow instead if possible).
13. update-project-names-tool: Updates the names of projects in the database.
14. create-users-tool: Creates users in the database using Slack member IDs.
15. fetch-user-tool: Fetches a user from the database using their Slack member ID.
16. extract-file-content-tool: Downloads and extracts text content from supported Slack or Google Drive files.
17. add-members-to-channel-tool: Adds members to a Slack channel (use workflow instead if possible).
18. create-channel-canvas-tool: Creates a canvas for a Slack channel (use workflow instead if possible).
19. create-channels-tool: Creates Slack channels (use workflow instead if possible).
20. find-users-by-email-tool: Resolves Slack user email addresses into Slack member IDs.
21. get-channel-history-tool: Fetches the latest 50 messages and thread replies from a Slack channel.
22. post-message-in-thread-tool: Posts a message as a reply in an existing Slack thread.
23. post-message-tool: Posts a message directly to a Slack channel.
24. remove-members-from-channel-tool: Removes members from a Slack channel (use workflow instead if possible).
25. get-thread-replies-tool: Fetches all messages belonging to an existing Slack thread.
26. get-channel-project-tool: Fetches the project ID associated with a Slack channel from the cache or database.
27. invalidate-channel-project-tool: Invalidates the cached project mapping for a Slack channel.
28. get-user-projects-tool: Retrieves the list of projects a user belongs to.
29. invalidate-user-projects-tool: Invalidates the cached list of projects associated with a user.
30. get-project-channels-tool: Fetches all channels associated with a project from the cache or database.
31. invalidate-project-channels-tool: Invalidates the cached channel list for a project.
32. append-channels-to-project-tool: Appends newly created channels to the cached channel list of a project.
33. get-project-users-tool: Fetches all users associated with a project from the cache or database.
34. invalidate-project-users-tool: Invalidates the cached user list for a project.
35. get-project-member-tool: Fetches a user's membership and role in a project from the cache or database.
36. is-project-member-tool: Checks whether a user is a member of a project.
37. is-project-manager-tool: Checks whether a user is a manager of a project.
38. invalidate-project-member-tool: Invalidates the cached membership information for a user in a project.
39. add-members-to-channels-workflow: Adds users to Slack channels within a project.
40. add-members-to-project-workflow: Adds users to a project.
41. change-project-member-roles-workflow: Changes the roles of existing project members.
42. create-canvas-for-channel-workflow: Creates a Slack canvas for a project channel.
43. create-channels-workflow: Creates Slack channels for a project.
44. create-project-workflow: Creates a new project and performs required setup.
45. delete-context-workflow: Deletes documents and their associated project context.
46. ingest-documents-workflow: Adds documents and text content to a project's knowledge base.
47. ingest-updates-workflow: Adds incremental updates to an existing project's knowledge base.
48. retrieval-public-workflow: Retrieves relevant context from the project's knowledge base.
49. remove-members-from-channels-workflow: Removes users from project channels without removing them from the project.
50. remove-members-from-project-workflow: Removes users from a project and all associated channels.`;
}