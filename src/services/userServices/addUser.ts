import { PrismaClient } from "@prisma/client";
import { getToken } from "./getToken";
import { checkUser } from "./isUserExist";
import { blogLogger } from "../../utils/logger";
interface Body {
  name: string;
  email: string;
}
const prisma = new PrismaClient();
export const addUser =async (body:Body): Promise<any> => {
  
  const user:any=await checkUser(body.email);
  let token:string=getToken(body);
    if (user === null) {
      try {
        const newUser = await prisma.users.create({
          data: {
            name: body.name,
            email: body.email,
            token: token,
          },
        });

      } catch (err: any) {
        blogLogger.error(err.message);
        return null;
      }
    } else {
      try {
        const newUser = await prisma.users.updateMany({
          where: { email: body.email },
          data: { token: token },
        });
      } catch (err: any) {
        blogLogger.error(err.message);
        return null;
      }
    }
    return token;
};
