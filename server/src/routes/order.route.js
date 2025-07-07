import express from "express";
import {
  getAllOrders,
  getUserOrders,
  placeOrder,
  placeOrderStripe,
} from "../controllers/order.controller.js";
import { authUser } from "../middleware/authUser.js";
import { authSeller } from "../middleware/authSeller.js";

const router = express.Router();

router.post("/cod", authUser, placeOrder);
router.post("/stripe", authUser, placeOrderStripe);

router.get("/user", authUser, getUserOrders);
router.get("/seller", authSeller, getAllOrders);

export default router;
