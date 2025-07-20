import express from "express";
import { checkout, verifyPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/checkout", checkout);
router.post("/verify", verifyPayment);

export default router;
