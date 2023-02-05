import { PrismaClient } from "@prisma/client";
import { blogLogger } from "../../utils/logger";
const prisma = new PrismaClient();
export const getBlogs = async () => {
  try {
    const blogs = await prisma.blogs.findMany();
    return blogs;
  } catch (err: any) {
    blogLogger.error(err.message);
  }
};
