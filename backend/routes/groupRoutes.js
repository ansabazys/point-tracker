import express from "express";
import { createGroup, getGroups, deleteGroup, getGroup, calculateTotalPoints } from "../controllers/groupController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect ,createGroup);
router.get("/", getGroups);
router.get("/:id" ,getGroup);
router.delete("/:id", protect, deleteGroup);
router.get('/:id/total-points', calculateTotalPoints);

export default router;
