import express from "express";
import userRoutes from "../routes/userRoutes";
import blogRoutes from "../routes/blogRoutes";
import { getConfig } from "../config/config";
const createServer=()=>{
    const app=express();
    app.use(express.json());
    app.use(getConfig.api_url,blogRoutes);
    app.use(getConfig.api_url,userRoutes);
    return app;
}
export default createServer;