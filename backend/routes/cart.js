import express from "express";
import { addToCart, getCart, clearCart,removeFromCart } from "../controllers/CartController.js";

const router = express.Router();

router.post("/add_to_cart", addToCart);
router.post("/remove_from_cart", removeFromCart);
router.post("/clearCart", clearCart);
router.get("/get_cart", getCart);

export default router;
