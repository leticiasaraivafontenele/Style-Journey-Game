import express from "express";
import { dbConnection } from "./db/dbconnetion.js";

const app=express();

dbConnection("cssjourney_db", "postgres", "root");
app.listen(5000,()=>{
  console.log("Server is running on port 5000");
})