import dotenv from "dotenv";

dotenv.config();

export const loadEnv = () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Environment variables loaded");
  }
};
