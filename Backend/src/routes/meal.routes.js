import { Router } from "express";
import { logMeal, getDailyNutrition, getNutritionHistory } from "../controllers/meal.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(logMeal).get(getDailyNutrition);
router.route("/history").get(getNutritionHistory);

export default router;
