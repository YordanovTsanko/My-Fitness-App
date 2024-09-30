import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["basic", "premium", "vip"],
  },
  length: {
    type: Number,
  },
  price: {
    type: Number,
  },
  code: {
    type: String,
    unique: true,
  },
});

const cartSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["basic", "premium", "vip"],
  },
  length: {
    type: Number,
  },
  price: {
    type: Number,
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: [30, "Name must be 30 characters or above."],
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg",
  },
  plan: [planSchema],
  cartItems: [cartSchema],
  date: { type: Date, default: Date.now },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", UserSchema);

export default User;
