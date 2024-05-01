// models.ts
import mongoose, { Schema, Document } from "mongoose";

// Define interface for Document
// interface User extends Document {
//   user: {
//     id: {
//       id: string;
//       secret: string;
//     };
//   };
// }

// Define schema
const usersSchema = new Schema({
  id: { type: String, required: true },
  secret: { type: String, required: true },
});

// Create and export User model
const UsersModel = mongoose.model("User", usersSchema);
export default UsersModel;
