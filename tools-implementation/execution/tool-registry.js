/**
 * Registry mapping string identifiers to their corresponding tool and workflow functions.
 * Includes the specific execution format required by each tool's schema.
 */

import createCanvasForChannel from "../../tools/database/channel/create-canvas-for-channel.js";
import fetchCanvasForChannel from "../../tools/database/channel/fetch-canvas-for-channel.js";
import linkProjectsToChannel from "../../tools/database/channel/link-project-to-channels.js";
import validateProjectChannels from "../../tools/database/channel/validate-project-channels.js";
import createDocuments from "../../tools/database/document/create-documents.js";
import deleteDocuments from "../../tools/database/document/delete-documents.js";
import linkProjectToThread from "../../tools/database/thread/link-project-to-thread.js";
import fetchDocumentsForProject from "../../tools/database/document/fetch-documents-for-project.js";
import fetchDocuments from "../../tools/database/document/fetch-documents.js";
import changeProjectMemberRoles from "../../tools/database/project/change-project-member-roles.js";
import createProject from "../../tools/database/project/create-project.js";
import fetchChannelsForProject from "../../tools/database/project/fetch-channels-for-project.js";
import linkProjectToUsers from "../../tools/database/project/link-project-to-users.js";
import removeUsersFromProject from "../../tools/database/project/remove-users-from-project.js";
import updateProjectNames from "../../tools/database/project/update-project-names.js";
import createUsers from "../../tools/database/user/create-users.js";
import fetchUser from "../../tools/database/user/fetch-user.js";
import buildUpdateText from "../../tools/files/file-download.js";
import addMembersToChannel from "../../tools/slack/add-members-to-channel.js";
import createChannelCanvas from "../../tools/slack/create-channel-canvas.js";
import createChannels from "../../tools/slack/create-channels.js";
import findUsersByEmail from "../../tools/slack/find-user-by-email.js";
import getChannelHistory from "../../tools/slack/get-channel-history.js";
import postMessageInThread from "../../tools/slack/post-message-in-thread.js";
import postMessage from "../../tools/slack/post-message.js";
import removeMembersFromChannel from "../../tools/slack/remove-members-from-channel.js";
import getThreadReplies from "../../tools/slack/thread-replies.js";
import { getChannelProject, invalidateChannelProject } from "../../redis/channel-cache-service.js";
import { getUserProjects, invalidateUserProjects } from "../../redis/project-cache-service.js";
import { getProjectChannels, invalidateProjectChannels, appendChannelsToProjectCache } from "../../redis/project-channels-cache-service.js";
import { getProjectUsers, invalidateProjectUsers } from "../../redis/project-users-cache-service.js";
import { getProjectMember, isProjectMember, isProjectManager, invalidateProjectMember } from "../../redis/security-cache-service.js";
import { getThreadProject, invalidateThreadProject } from "../../redis/thread-cache-service.js";

import addMembersToChannels from "../../workflows/add-members-to-channel.js";
import addMembersToProject from "../../workflows/add-members-to-project.js";
import changeProjectMemberRolesWorkflow from "../../workflows/change-project-member-roles.js";
import createCanvasForChannelWorkflow from "../../workflows/create-canvas-for-channel.js";
import createChannelsWorkflow from "../../workflows/create-channels.js";
import createProjectWorkflow from "../../workflows/create-project.js";
import deleteContextWorkflow from "../../workflows/delete-context.js";
import ingestDocumentsWorkflow from "../../workflows/ingest-documents.js";
import ingestUpdatesWorkflow from "../../workflows/ingest-updates.js";
import privateRetrievalWorkflow from "../../workflows/private-retrieval.js";
import publicRetrievalWorkflow from "../../workflows/public-retrieval.js";
import removeMembersFromChannels from "../../workflows/remove-members-from-channels.js";
import removeMembersFromProject from "../../workflows/remove-members-from-project.js";

const toolRegistry = {
  "create-canvas-for-channel-tool": { handler: createCanvasForChannel, format: ["channelCanvasPairs"] },
  "fetch-canvas-for-channel-tool": { handler: fetchCanvasForChannel, format: ["channelIds"] },
  "link-projects-to-channel-tool": { handler: linkProjectsToChannel, format: ["projectId", "channels"] },
  "validate-project-channels-tool": { handler: validateProjectChannels, format: ["projectId", "channelIds"] },
  "create-documents-tool": { handler: createDocuments, format: ["documents"] },
  "delete-documents-tool": { handler: deleteDocuments, format: ["documentIds"] },
  "link-project-to-thread-tool": { handler: linkProjectToThread, format: ["projectId", "threadId"] },
  "fetch-documents-for-project-tool": { handler: fetchDocumentsForProject, format: ["projectId"] },
  "fetch-documents-tool": { handler: fetchDocuments, format: ["documentIds"] },
  "change-project-member-roles-tool": { handler: changeProjectMemberRoles, format: ["users"] },
  "create-project-tool": { handler: createProject, format: ["projectName", "creatorSlackId"] },
  "fetch-channels-for-project-tool": { handler: fetchChannelsForProject, format: ["projectId"] },
  "link-project-to-users-tool": { handler: linkProjectToUsers, format: ["projectId", "users"] },
  "remove-users-from-project-tool": { handler: removeUsersFromProject, format: ["projectId", "userIds"] },
  "update-project-names-tool": { handler: updateProjectNames, format: ["projects"] },
  "create-users-tool": { handler: createUsers, format: ["users"] },
  "fetch-user-tool": { handler: fetchUser, format: ["slackMemberId"] },
  "extract-file-content-tool": { handler: buildUpdateText, format: ["files"] },
  "add-members-to-channel-tool": { handler: addMembersToChannel, format: ["channel", "userIds"] },
  "create-channel-canvas-tool": { handler: createChannelCanvas, format: ["channelId", "content"] },
  "create-channels-tool": { handler: createChannels, format: ["channels"] },
  "find-users-by-email-tool": { handler: findUsersByEmail, format: ["emails"] },
  "get-channel-history-tool": { handler: getChannelHistory, format: ["channel"] },
  "post-message-in-thread-tool": { handler: postMessageInThread, format: ["channel", "threadTs", "text"] },
  "post-message-tool": { handler: postMessage, format: ["channel", "text"] },
  "remove-members-from-channel-tool": { handler: removeMembersFromChannel, format: ["channel", "userIds"] },
  "get-thread-replies-tool": { handler: getThreadReplies, format: ["channel", "threadTs"] },
  "get-channel-project-tool": { handler: getChannelProject, format: ["channelId"] },
  "invalidate-channel-project-tool": { handler: invalidateChannelProject, format: ["channelId"] },
  "get-user-projects-tool": { handler: getUserProjects, format: ["userId"] },
  "invalidate-user-projects-tool": { handler: invalidateUserProjects, format: ["userId"] },
  "get-project-channels-tool": { handler: getProjectChannels, format: ["projectId"] },
  "invalidate-project-channels-tool": { handler: invalidateProjectChannels, format: ["projectId"] },
  "append-channels-to-project-tool": { handler: appendChannelsToProjectCache, format: ["projectId", "newChannels"] },
  "get-project-users-tool": { handler: getProjectUsers, format: ["projectId"] },
  "invalidate-project-users-tool": { handler: invalidateProjectUsers, format: ["projectId"] },
  "get-project-member-tool": { handler: getProjectMember, format: ["projectId", "userId"] },
  "is-project-member-tool": { handler: isProjectMember, format: ["projectId", "userId"] },
  "is-project-manager-tool": { handler: isProjectManager, format: ["projectId", "userId"] },
  "invalidate-project-member-tool": { handler: invalidateProjectMember, format: ["projectId", "userId"] },
  "get-thread-project-tool": { handler: getThreadProject, format: ["threadId"] },
  "invalidate-thread-project-tool": { handler: invalidateThreadProject, format: ["threadId"] },

  "add-members-to-channels-workflow": { handler: addMembersToChannels, format: ["projectId", "channels"] },
  "add-members-to-project-workflow": { handler: addMembersToProject, format: ["projectId", "users"] },
  "change-project-member-roles-workflow": { handler: changeProjectMemberRolesWorkflow, format: ["users"] },
  "create-canvas-for-channel-workflow": { handler: createCanvasForChannelWorkflow, format: ["projectId", "channelId", "content"] },
  "create-channels-workflow": { handler: createChannelsWorkflow, format: ["projectId", "userId", "channels"] },
  "create-project-workflow": { handler: createProjectWorkflow, format: "object" },
  "delete-context-workflow": { handler: deleteContextWorkflow, format: ["projectId", "documentIds"] },
  "ingest-documents-workflow": { handler: ingestDocumentsWorkflow, format: "object" },
  "ingest-updates-workflow": { handler: ingestUpdatesWorkflow, format: "object" },
  "retrieval-private-workflow": { handler: privateRetrievalWorkflow, format: ["query", "projectId"] },
  "retrieval-public-workflow": { handler: publicRetrievalWorkflow, format: ["query", "projectId"] },
  "remove-members-from-channels-workflow": { handler: removeMembersFromChannels, format: ["projectId", "channels"] },
  "remove-members-from-project-workflow": { handler: removeMembersFromProject, format: ["projectId", "userIds"] }
};

export default toolRegistry;