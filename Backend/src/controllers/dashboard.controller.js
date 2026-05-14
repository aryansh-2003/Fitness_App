import mongoose from "mongoose"
import { User } from "../models/user.model.js"
import { Workout } from "../models/workout.model.js"
import { Meal } from "../models/meal.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const getDashboardStats = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    // 1. Fetch User
    const user = await User.findById(userId).select("-password");
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // 2. Today's Stats
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const workoutsToday = await Workout.find({
        user: userId,
        date: { $gte: startOfToday, $lte: endOfToday }
    });
    const caloriesBurnedToday = workoutsToday.reduce((sum, w) => sum + w.caloriesBurned, 0);

    // 3. Weekly Stats (Past 7 Days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const weeklyWorkoutStats = await Workout.aggregate([
        { 
            $match: { 
                user: userId, 
                date: { $gte: sevenDaysAgo } 
            } 
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                calories: { $sum: "$caloriesBurned" }
            }
        }
    ]);

    const weeklyMealStats = await Meal.aggregate([
        { 
            $match: { 
                user: userId, 
                date: { $gte: sevenDaysAgo } 
            } 
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                calories: { $sum: "$calories" },
                protein: { $sum: "$protein" }
            }
        }
    ]);

    // 4. Generate Chart Data
    const chartData = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
        
        const wStat = weeklyWorkoutStats.find(s => s._id === dateStr);
        const mStat = weeklyMealStats.find(s => s._id === dateStr);

        chartData.push({
            name: dayName,
            date: dateStr,
            workoutCalories: wStat ? wStat.calories : 0,
            mealCalories: mStat ? mStat.calories : 0,
            protein: mStat ? mStat.protein : 0
        });
    }

    return res.status(200).json(
        new ApiResponse(200, {
            caloriesBurned: caloriesBurnedToday,
            workoutsThisWeek: weeklyWorkoutStats.length,
            streakDays: user.streak || 2,
            goalProgress: 40,
            weeklyChart: chartData,
            todaysWorkout: [],
            workoutId: null
        }, "Dashboard stats fetched successfully")
    );
});

export {
    getDashboardStats
}