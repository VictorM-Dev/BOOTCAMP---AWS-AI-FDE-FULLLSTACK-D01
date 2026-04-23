export class AppError extends Error{
  constructor(public message: string, public statusCode: number){
    super(message);
    console.log(`Error (${statusCode}): ${message}`);
  };
}
