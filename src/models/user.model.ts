import bcrypt from "bcrypt";
import config from "config";
import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    password: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

// If the password changed, hash it before we save it to the database
userSchema.pre("save", async function (next) {
  let user = this as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));
  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

// Compare the hashed password with what the user typed in
userSchema.methods.comparePassword = async function (password: string) {
  const user = this as UserDocument;

  return bcrypt.compare(password, user.password).catch(() => false);
};

const User = new mongoose.Model("User", userSchema);

export default User;
