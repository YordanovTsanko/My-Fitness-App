import User from "../models/User.js";

export const addToCart = async (req, res) => {
  const { name, price } = req.body;

  let period = 1;
  let correctPrice = 1;

  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Please log in to proceed" });
  }

  if (!price) {
    return res.status(401).json({ message: "Wrong price value" });
  }

  const priceToString = price.toString();

  if (priceToString.length === 2) {
    period = 1;
    correctPrice = price;
  } else {
    period = 12;
    correctPrice = price / 10;
  }

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cartItems.push({ name, price: correctPrice, length: period });
    await user.save();

    return res.status(200).json({ message: "Plan added successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getCart = async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Please log in to proceed" });
      }
  
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json({ cartItems: user.cartItems });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  };
  
