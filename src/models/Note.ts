import { model, models, Schema } from "mongoose";

export interface INote {
  title: string;
  description?: string;
  subject: string;
  fileUrl: string;
  semester: number; // 🔒 REQUIRED
  uploadedBy: Schema.Types.ObjectId;
}

const noteSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    description: String,
    subject: { type: String, required: true },
    fileUrl: { type: String, required: true },
    semester: {
      type: Number,
      min: 1,
      max: 8,
      required: true,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default models.Note || model<INote>("Note", noteSchema);
