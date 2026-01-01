import mongoose, { Schema, model, models } from "mongoose";

const eventSchema = new Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String 
    },
    date: { 
      type: Date, 
      required: true 
    },
    location: { 
      type: String 
    },
    createdBy: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
  },
  { timestamps: true }
);

const Event = models.Event || model("Event", eventSchema);
export default Event;
