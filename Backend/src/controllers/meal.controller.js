import { Meal } from "../models/meal.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const logMeal = asyncHandler(async (req, res) => {
    const { name, calories, protein, type } = req.body;

    if (!name || !calories || !protein || !type) {
        throw new ApiError(400, "All fields are required");
    }

    const meal = await Meal.create({
        user: req.user._id,
        name,
        calories,
        protein,
        type
    });

    return res.status(201).json(new ApiResponse(201, meal, "Meal logged successfully"));
});

const getDailyNutrition = asyncHandler(async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const meals = await Meal.find({
        user: req.user._id,
        date: { $gte: today }
    });

    const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
    const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);

    return res.status(200).json(new ApiResponse(200, {
        meals,
        totalCalories,
        totalProtein,
        goalCalories: 2500,
        goalProtein: 150
    }, "Daily nutrition retrieved"));
});

const getNutritionHistory = asyncHandler(async (req, res) => {
    const history = await Meal.find({ user: req.user._id }).sort({ date: -1 }).limit(20);
    return res.status(200).json(new ApiResponse(200, history, "Nutrition history retrieved"));
});

export { logMeal, getDailyNutrition, getNutritionHistory };
