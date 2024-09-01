const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const {createTokenForUser}= require("../services/auth.services")

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: "/images/user.jpg",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = "salthash";
  const hashPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  this.salt = salt;
  this.password = hashPassword;
  return next();
});

UserSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found");

    const salt = user.salt;
    const hashPassword = user.password;

    const userProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    // return hashPassword === userProvidedHash;

    if (hashPassword !== userProvidedHash) {
      throw new Error("Incorrect password");
    }

    // return user
    const token = createTokenForUser(user);
    return token;
  }
);

const User = new model("User", UserSchema);

module.exports = User;
