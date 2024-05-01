// models.ts
import mongoose, { Schema, Document } from "mongoose";

// Define interface for Document
interface User extends Document {
  id: string;
  secret: string;
}

// Define schema
const userSchema: Schema<User> = new Schema({
  id: { type: String, required: true },
  secret: { type: String, required: true, unique: true },
});

// Create and export User model
const UserModel = mongoose.model<User>("User", userSchema);
export default UserModel;
