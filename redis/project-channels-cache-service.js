import prisma from "../services/db/prisma-client.js";

import {
    get,
    set,
    deleteKey
} from "./cache-service.js";

const PROJECT_CHANNELS_TTL = 3600;

/**
 * Generates the cache key string for project channels.
 */
function getProjectChannelsCacheKey(
    projectId
) {
    return `project-channels:${projectId}`;
}

/**
 * Retrieves the list of channels associated with a project ID from cache or database.
 */
export async function getProjectChannels(
    projectId
) {
    console.log("Project ID " + projectId);

    const cacheKey =
        getProjectChannelsCacheKey(
            projectId
        );

    try {
        const cachedChannels =
            await get(cacheKey);

        if (cachedChannels) {
            return cachedChannels;
        }
    } catch (error) {
        console.error(
            `[CACHE READ FAILED] ${cacheKey}`,
            error
        );
    }

    const projectChannels =
        await prisma.channel.findMany({
            where: {
                project_id: projectId
            }
        });

    const channels =
        projectChannels.map(
            (channel) => ({
                channelId: channel.channel_id,
                name: channel.name,
                canvasId: channel.canvas_id,
                isPrivate: channel.is_private
            })
        );

    try {
        await set(
            cacheKey,
            channels,
            PROJECT_CHANNELS_TTL
        );
    } catch (error) {
        console.error(
            `[CACHE WRITE FAILED] ${cacheKey}`,
            error
        );
    }

    return channels;
}

/**
 * Removes the cached channel list for a specific project ID.
 */
export async function invalidateProjectChannels(
    projectId
) {
    const cacheKey =
        getProjectChannelsCacheKey(
            projectId
        );

    try {
        await deleteKey(
            cacheKey
        );
    } catch (error) {
        console.error(
            `[CACHE INVALIDATION FAILED] ${cacheKey}`,
            error
        );
    }
}

/**
 * Updates the project channels cache by appending unique new channels or fetching the complete list from the database if the cache is missing.
 */
export async function appendChannelsToProjectCache(
    projectId,
    newChannels
) {
    const cacheKey =
        getProjectChannelsCacheKey(
            projectId
        );

    try {
        const cachedChannels =
            await get(cacheKey);

        if (cachedChannels) {
            const existingChannelIds =
                new Set(
                    cachedChannels.map(
                        (channel) =>
                            channel.channelId
                    )
                );

            const uniqueNewChannels =
                newChannels.filter(
                    (channel) =>
                        !existingChannelIds.has(
                            channel.channelId
                        )
                );

            if (
                uniqueNewChannels.length >
                0
            ) {
                const updatedChannels = [
                    ...cachedChannels,
                    ...uniqueNewChannels
                ];

                await set(
                    cacheKey,
                    updatedChannels,
                    PROJECT_CHANNELS_TTL
                );
            }
        } else {
            await getProjectChannels(
                projectId
            );
        }
    } catch (error) {
        console.error(
            `[CACHE UPDATE FAILED] ${cacheKey}`,
            error
        );
    }
}