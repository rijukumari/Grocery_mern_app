import express from "express";
import { authUser } from "../middleware/authUser.js";
import { updatedCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.post('/update', authUser, updatedCart)


export default router;
