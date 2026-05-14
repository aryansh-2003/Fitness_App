import mongoose from "mongoose";
import { Workout } from "../models/workout.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { EXERCISE_MET } from "../constants.js";

const logWorkout = asyncHandler(async (req, res) => {
    let { name, duration, caloriesBurned, exercises, date } = req.body;
    
    if (!name || !duration) {
        throw new ApiError(400, "Name and duration are required");
    }

    if (!caloriesBurned) {
        const user = await User.findById(req.user._id);
        const weight = user.weight || 70;
        const met = EXERCISE_MET[name] || 5.0;
        
        caloriesBurned = Math.round((met * weight * duration) / 60);
    }

    const workout = await Workout.create({
        user: req.user._id,
        name,
        date: date || new Date(),
        duration,
        caloriesBurned,
        exercises: exercises || [],
        completed: true
    });

    return res.status(201).json(new ApiResponse(201, workout, "Workout logged successfully"));
});

const getUserWorkouts = asyncHandler(async (req, res) => {
    const workouts = await Workout.find({ user: req.user._id }).sort({ date: -1 });
    return res.status(200).json(new ApiResponse(200, workouts, "Workouts retrieved successfully"));
});

const getWorkoutHistory = asyncHandler(async (req, res) => {
    const history = await Workout.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(req.user._id) } },
        { $sort: { date: -1 } },
        { $limit: 20 },
        {
            $project: {
                name: 1,
                date: 1,
                duration: 1,
                caloriesBurned: 1,
                completed: 1
            }
        }
    ]);
    return res.status(200).json(new ApiResponse(200, history, "Workout history retrieved"));
});

const toggleExerciseCompletion = asyncHandler(async (req, res) => {
    const { workoutId, exerciseId } = req.params;
    const { completed } = req.body;

    const workout = await Workout.findOne({ _id: workoutId, user: req.user._id });
    if (!workout) {
        throw new ApiError(404, "Workout not found");
    }

    const exercise = workout.exercises.id(exerciseId);
    if (!exercise) {
        throw new ApiError(404, "Exercise not found");
    }

    exercise.completed = completed !== undefined ? completed : !exercise.completed;
    await workout.save();

    return res.status(200).json(new ApiResponse(200, workout, "Exercise completion toggled"));
});

export { logWorkout, getUserWorkouts, toggleExerciseCompletion, getWorkoutHistory };
