import cookieParser from "cookie-parser";
import express from "express"
import { authRoutes } from "./routes/auth.routes.js";
import { musicRoutes } from "./routes/music.routes.js";

const app = express();

app.use(express.json())
app.use(cookieParser())


app.get("/", (req,res)=>{
    res.send("App is running")
})
app.use("/api/auth", authRoutes)
app.use("/api/music", musicRoutes)


export default app