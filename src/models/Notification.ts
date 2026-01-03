import mongoose, { Schema, models } from "mongoose";

const NotificationSchema = new Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, index: { expires: '7d' } },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    read: { type: Boolean, default: false },

    type: {
      type: String,
      enum: ["note", "event", "cafeteria"],
      required: true,
    },
  },
  { timestamps: true }
);

export default models.Notification ||
  mongoose.model("Notification", NotificationSchema);
