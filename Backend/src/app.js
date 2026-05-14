import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import status from "express-status-monitor"
import { Server } from "socket.io"
import http from "http";


const app = express()


app.use(cors({
  origin: [process.env.CORS_ORIGIN, "http://localhost:5173"],
  credentials: true
}))

export const httpServer = http.createServer(app)
const io = new Server(httpServer, {

  cors: {
    origin: [process.env.CORS_ORIGIN, "http://localhost:5173"]
  },

})

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


app.use(status())
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static("public"))
app.use(cookieParser())


// routes import
import userRouter from './routes/user.routes.js'
import statsRouter from "./routes/dashboard.routes.js"
import workoutRouter from "./routes/workout.routes.js"
import mealRouter from "./routes/meal.routes.js"

//routes declaration 
app.use("/api/v1/users", userRouter)
app.use("/api/v1/stats", statsRouter)
app.use("/api/v1/workouts", workoutRouter)
app.use("/api/v1/meals", mealRouter)


export { app } 