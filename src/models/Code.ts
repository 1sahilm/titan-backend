import mongoose from "mongoose";

const CodeSchema = new mongoose.Schema({

  code: {
    type: String,
    required: true,
    unique: true
  },

  status: {
    type: String,
    enum: ["unused", "used"],
    default: "unused"
  },

  product: {
    type: String
  },

  verifiedAt: {
    type: Date
  }

});

export default mongoose.model("Code", CodeSchema);