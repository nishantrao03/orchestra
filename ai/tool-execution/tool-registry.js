import {
  getUserProjects
} from "../../redis/project-cache-service.js";

import createProjectWorkflow
  from "../../workflows/create-project.js";

import linkProjectToThread
  from "../../tools/database/thread/link-project-to-thread.js";

const toolRegistry = {
  "get-user-projects":
    getUserProjects,

  "create-project-workflow":
    createProjectWorkflow,

  "link-project-to-thread":
    linkProjectToThread
};

export default toolRegistry;