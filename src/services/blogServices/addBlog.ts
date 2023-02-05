import { blogs, PrismaClient } from "@prisma/client";
import { blogLogger } from "../../utils/logger";
const prisma = new PrismaClient();
interface Body {
  name: string;
  email: string;
  title: string;
  description: string;
}

export const addBlog = async (body: Body): Promise<any> => {
  let user: any = null;
  let blog:blogs| any = null;
    
  try {
    user = await prisma.users.findFirst({
      where: {
        email: body.email,
      },
    });

    const newBlog = await prisma.blogs.create({
      data: {
        createdBy: user.id,
        createdOn: new Date(),
        title: body.title,
        description: body.description,
      },
    });
    blog = newBlog;
  } catch (err: any) {
    blogLogger.error(err.message);
    return null;
  }

  return blog;
};
