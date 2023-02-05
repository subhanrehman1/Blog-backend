import { PrismaClient } from "@prisma/client";
import { checkUser } from "../userServices/isUserExist";
const prisma = new PrismaClient();
export const deleteBlog = async (id: string, email: string): Promise<any> => {
  const user = await checkUser(email);
  const blog = await prisma.blogs.findUnique({
    where: { id: id },
  });
  if (blog?.createdBy === user.id) {
    const deletedBlog = await prisma.blogs.delete({
      where: {
        id: id,
      },
    });
    
    return deletedBlog;
  } else {
    return null;
  }
};
