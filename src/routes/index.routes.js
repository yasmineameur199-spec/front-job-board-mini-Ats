import express from "express";

import applicationRoutes from "./application.routes.js";
import applicationStageRoutes from "./applicationStage.routes.js";
import categoryRoutes from "./category.routes.js";
import commentRoutes from "./comment.routes.js";
import companyRoutes from "./company.routes.js";
import hasCommentRoutes from "./hasComment.routes.js";
import jobRoutes from "./job.routes.js";
import jobCategoryRoutes from "./jobCategory.routes.js";
import roleRoutes from "./role.routes.js";
import stageRoutes from "./stage.routes.js";
import userRoutes from "./user.routes.js";
import userRoleRoutes from "./userRole.routes.js";

const router = express.Router();

// Liste complète des routes
router.use("/applications", applicationRoutes);
router.use("/application-stages", applicationStageRoutes);
router.use("/categories", categoryRoutes);
router.use("/comments", commentRoutes);
router.use("/companies", companyRoutes);
router.use("/has-comments", hasCommentRoutes);
router.use("/jobs", jobRoutes);

router.use("/roles", roleRoutes);
router.use("/stages", stageRoutes);
router.use("/users", userRoutes);
router.use("/user-roles", userRoleRoutes);
router.use("/job-categories", jobCategoryRoutes);

export { router as indexRouter };
