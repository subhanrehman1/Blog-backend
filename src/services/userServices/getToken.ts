import { sign } from "jsonwebtoken";
import { getConfig } from "../../config/config";
interface Body{
    name:String;
    email:String;
}
const secret:string|undefined=getConfig.secret;
export const getToken=(user:Body):string=>{
    const jsontoken:string = sign({ result: user }, getConfig.secret, {
        expiresIn: "24h",
      });
      return jsontoken;
}