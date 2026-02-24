import express from "express";
import { dbConnection } from "./db/dbconnetion.js";
import router from "./route/routes.js";
import cookie from "cookie-parser";

const app=express();

app.use(express.json());
app.use(cookie());
app.use("/api", router);

dbConnection("cssjourney_db", "postgres", "postgres");
app.listen(5000,()=>{
  console.log("Server is running on port 5000");
})