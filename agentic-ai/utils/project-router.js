// utils/project-router.js

import { getChannelProject } from "../../redis/channel-cache-service.js";
import { getThreadProject } from "../../redis/thread-cache-service.js";

export default async function getProjectId({ channelId, threadId }) {
    try {
        if (!channelId) {
            throw new Error("Channel ID is required.");
        }

        // ----------------------------
        // Channel Messages (C...)
        // ----------------------------
        if (channelId.startsWith("C")) {
            try {
                const projectId = await getChannelProject(channelId);

                return projectId || null;
            } catch (error) {
                console.error(
                    `Failed to fetch project for channel ${channelId}:`,
                    error
                );
                throw error;
            }
        }

        // ----------------------------
        // DMs / Group DMs (D... / G...)
        // ----------------------------
        if (channelId.startsWith("D") || channelId.startsWith("G")) {
            if (!threadId) {
                return null;
            }

            try {
                const projectId = await getThreadProject(threadId);

                return projectId || null;
            } catch (error) {
                console.error(
                    `Failed to fetch project for thread ${threadId}:`,
                    error
                );
                throw error;
            }
        }

        console.warn(`Unsupported channel type: ${channelId}`);

        return null;
    } catch (error) {
        console.error("Error while resolving project ID:", error);
        throw error;
    }
}
