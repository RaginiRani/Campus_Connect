import mongoose, { Schema, model, models } from "mongoose";

const cafeteriaSchema = new Schema(
  {
    date: { type: Date, required: true },
    breakfast: { type: String, required: true },
    lunch: { type: String, required: true },
    dinner: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Cafeteria = models.Cafeteria || model("Cafeteria", cafeteriaSchema);
export default Cafeteria;
