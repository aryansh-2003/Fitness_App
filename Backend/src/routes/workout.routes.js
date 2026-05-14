import { Router } from "express";
import { logWorkout, getUserWorkouts, toggleExerciseCompletion, getWorkoutHistory } from "../controllers/workout.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(logWorkout).get(getUserWorkouts);
router.route("/history").get(getWorkoutHistory);
router.route("/:workoutId/exercises/:exerciseId").patch(toggleExerciseCompletion);

export default router;
