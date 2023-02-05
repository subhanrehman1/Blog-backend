import express, { Application, Request, Response } from "express";
import { getConfig } from "./config/config";
import blogRouter from "./routes/blogRoutes";
import userRouter from "./routes/userRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";
// import bodyParser from "body-parser";
export const app: Application = express();

// allowing cors for frontend at port 3000
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(getConfig.api_url, userRouter);
app.use(getConfig.api_url, blogRouter)

app.listen(getConfig.port, () => {
  console.log(`listening on port ${getConfig.port}`);
});
