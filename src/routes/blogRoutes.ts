import express from "express";
import { auth } from "../middlewares/auth";
import {
  addBlogController,
  deleteBlogController,
  editBlogController,
  getBlogsController,
} from "../controllers/blogController";
const blogRouter = express.Router();
blogRouter.delete(`/:id`, auth, deleteBlogController);
blogRouter.put(`/:id`, auth, editBlogController);
blogRouter.post(`/`, auth, addBlogController);
blogRouter.get(`/`, getBlogsController);
export default blogRouter;
