import express, { Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./config/db"
import noteRouter from "./routes/noteRoutes"
dotenv.config()

const app = express()
connectDB()

app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(express.json())
const PORT = process.env.PORT || 8000



app.get("/", (req: Request, res: Response) => {
    res.json({
        status: "success",
        message: "Hello"
    })
})
app.use("/notes", noteRouter)
app.listen(PORT, () => {
    console.log(`Your server is running at ${PORT}`)
})