import { Request, Response } from "express";
import { statusCodes } from "../constants/statusCodes";
import { getBlogs } from "../services/blogServices/getBlogs";
import { addBlog } from "../services/blogServices/addBlog";
import { deleteBlog } from "../services/blogServices/deleteBlog";
import { editBlog } from "../services/blogServices/editBlog";
import { blogLogger } from "../utils/logger";
interface Body {
  name: string;
  email: string;
  title: string;
  description: string;
}
export const addBlogController = async (req: Request, res: Response) => {
  const body: Body = req.body;
  if (!body.title || !body.description) {
    return res
      .status(statusCodes.badRequest)
      .json({
        success: "error",
        message: "please enter title and description",
      });
  }

  try {
    const blog = await addBlog(body);
    return res.status(statusCodes.created).send(blog);
  } catch (err: any) {
    blogLogger.error(err.message);
    return res
      .status(statusCodes.badRequest)
      .json({ success: "error", message: "cannot add blog" });
  }
};
export const getBlogsController = async (req: Request, res: Response) => {
  const blogs: any = await getBlogs();
  if (!blogs) {
    return res
      .status(statusCodes.notFound)
      .json({ success: true, message: "no blogs found" });
  } else {
    return res.status(statusCodes.success).send(blogs);
  }
};

export const deleteBlogController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedBlog = await deleteBlog(id, req.body.email);
  if (deletedBlog !== null) {
    res.status(statusCodes.created).send(deletedBlog);
  } else {
    res
      .status(statusCodes.badRequest)
      .json({ success: "error", message: "blog cannot be deleted" });
  }
};
export const editBlogController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, description } = req.body;
  if (!req.body.title || !req.body.description) {
    return res
      .status(statusCodes.badRequest)
      .json({
        success: "error",
        message: "please enter title and description",
      });
  }
  const editedBlog = await editBlog(id, req.body.email, title, description);
  if (editedBlog !== null) {
    res.status(statusCodes.created).send(editedBlog);
  } else {
    res
      .status(statusCodes.badRequest)
      .json({ success: "error", message: "blog cannot be edited" });
  }
};
