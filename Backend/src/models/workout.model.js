import mongoose, {Schema} from "mongoose";

const exerciseSchema = new Schema({
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number }, // optional
    completed: { type: Boolean, default: false }
});

const workoutSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: Number, // in minutes
        required: true
    },
    caloriesBurned: {
        type: Number,
        required: true
    },
    exercises: [exerciseSchema],
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const Workout = mongoose.model("Workout", workoutSchema);
