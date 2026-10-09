import { Router } from "express";
import { activityController } from "../controllers/activityController.js";
import { authenticate, authorize } from "../middleware/auth.js";
const router = Router();
router.get("/", activityController.list);
router.get("/:id", activityController.get);
router.post("/", authenticate, authorize("admin"), activityController.create);
export default router;
