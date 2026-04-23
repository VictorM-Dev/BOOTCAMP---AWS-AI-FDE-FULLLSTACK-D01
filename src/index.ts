import express from "express";
import directorRouter from "./routes/directorRouter.js"
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import movieRouter from "./routes/movieRouter.js";
const app = express();

app.use(express.json());
app.use(directorRouter);
app.use(movieRouter);
app.use(errorMiddleware);

app.listen(3000, ()=>{
  console.log("Server inited: http://localhost:3000");
})