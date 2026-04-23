export class AppError extends Error{
  constructor(public message: string, public statusCode: number){
    super(message);
    console.log(`Error (${statusCode}): ${message}`);
  };
}

export class ArgumentError extends AppError{
  constructor(public message: string){
    super(message, 400);
  }
}

