import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface UserProp {
  email: string;
  password: string;
  name: string;
  company?: string;
  isAdmin?: boolean;
}

interface userModelProps extends mongoose.Model<UserDoc> {
  build(attr: UserProp): any;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  company?: string;
  isAdmin?: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    select: false,
  },
  isAdmin: {
    type: Boolean,
    select: true,
    default: false,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;

  next();
});

userSchema.statics.build = (attr: UserProp) => new User(attr);

const User = mongoose.model<UserDoc, userModelProps>("User", userSchema);

export { User };
