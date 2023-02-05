import { PrismaClient } from "@prisma/client";
import { checkUser } from "../userServices/isUserExist";
const prisma = new PrismaClient();
export const editBlog = async (id: string, email: string,title:string,description:string): Promise<any> => {
  const user = await checkUser(email);
  const blog = await prisma.blogs.findUnique({
    where: { id: id },
  });
  if (blog?.createdBy === user.id) {
    const editedBlog = await prisma.blogs.update({
      where: {
        id: id,
      },
      data:{
        title:title,
        description:description
      }
    });
    
    return editedBlog;
  } else {
    return null;
  }
};
