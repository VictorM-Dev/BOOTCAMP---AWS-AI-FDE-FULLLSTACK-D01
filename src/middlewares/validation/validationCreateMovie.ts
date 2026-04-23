import type { Request, Response, NextFunction } from "express";
import { AppError } from "../appError.js";

export default function validationCreateDirector(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { title, description, releaseYear, genre, directorId } = req.body;
  if(!title) {
    throw new AppError("Title is requirede", 400);
  } else if(typeof title !== "string"){
    throw new AppError("Title must be a string", 400);
  }

  if(!releaseYear) {
    throw new AppError("Release year is requirede", 400);
  } else if(typeof releaseYear !== "number"){
    throw new AppError("Release year must be a number", 400);
  } else if(releaseYear > new Date().getFullYear()){
    throw new AppError("Release year cannot be in the future", 400);
  }

  if(description.length > 255) {
    throw new AppError("Description size must be between 0 and 255", 400);
  }

  if(!genre) {
    throw new AppError("Genre is requirede", 400);
  } else if(typeof genre !== "string"){
    throw new AppError("Genre must be a string", 400);
  }

  if(!directorId){
    throw new AppError("Director ID is requirede", 400);
  } else if(typeof directorId !== "string"){
    throw new AppError("Genre must be a string", 400);
  }
  
  next()
}
