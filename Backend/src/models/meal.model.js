import mongoose, {Schema} from "mongoose";

const mealSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    protein: {
        type: Number, // in grams
        required: true
    },
    type: {
        type: String,
        enum: ["Vegan", "Non-Veg"],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export const Meal = mongoose.model("Meal", mealSchema);
