import express from "express";
import { addToCart, getCart } from "../controllers/CartController.js";

const router = express.Router();

router.post("/add_to_cart", addToCart);
router.get("/get_cart", getCart);

export default router;
