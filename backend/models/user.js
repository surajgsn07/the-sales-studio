const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, unique: true, sparse: true },
    password: { type: String }, // Not required for guest users
  },
  { timestamps: true }
);

// ✅ Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Method to check password validity
UserSchema.methods.comparePassword = async function (password) {
  if (!this.password) return false; // Guest users don't have passwords
  return await bcrypt.compare(password, this.password);
};

// ✅ Method to generate JWT token
UserSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = mongoose.model("User", UserSchema);
