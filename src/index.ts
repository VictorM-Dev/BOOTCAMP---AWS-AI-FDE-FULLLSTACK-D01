import express from "express";
import directorRouter from "./routes/directorRouter.js"
const app = express();

app.use(express.json());
app.use(directorRouter);

app.listen(3000, ()=>{
  console.log("Server inited: http://localhost:3000");
})