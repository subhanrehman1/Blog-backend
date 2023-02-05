import { PrismaClient } from "@prisma/client";
import { blogLogger } from "../../utils/logger";
const prisma =new PrismaClient();
export const checkUser=async(email:string):Promise<any>=>{
    try {
        const user = await prisma.users.findFirst({
          where: {
            email: email,
          },
        });
        return user;
      } catch (err: any) {
        blogLogger.error(err.message);
        return null;
      }
}