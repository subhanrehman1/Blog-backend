import Dotenv from "dotenv";
Dotenv.config();

const envs = process.env;

interface ProcessEnv {
  port: string|undefined;
  node_environment: string|undefined;
  api_url: String|any;
  secret:string|any;
}
export const getConfig: ProcessEnv = {
  port: envs.PORT,
  node_environment: envs.NODE_ENV,
  api_url: envs.API_URL,
  secret:envs.SECRET,
};
