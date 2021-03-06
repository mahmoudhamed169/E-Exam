const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    fristName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String },
    level: { type: mongoose.Schema.Types.ObjectId, ref: "levels" },
    department: { type: mongoose.Schema.Types.ObjectID, ref: "departments" },

    role: { type: String, required: true },
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 7);
  next();
});

module.exports = userSchema;
