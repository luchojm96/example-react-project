import { Router } from "express";
import { reservationController } from "../controllers/reservationController.js";
import { authenticate } from "../middleware/auth.js";
const router = Router();
router.use(authenticate);
router.get("/", reservationController.list);
router.post("/", reservationController.create);
export default router;
