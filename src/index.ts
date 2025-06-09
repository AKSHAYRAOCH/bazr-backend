import {toNodeHandler} from "better-auth/node";
import { config } from "dotenv";
import { auth } from "./utils/auth";
import express from "express";
import { Request,Response,NextFunction } from "express";
import cors from "cors";
import { homeRoute } from "./routes";


config()



const app = express()

app.use(
    cors({
      origin: "http://localhost:3000", // Replace with your frontend's origin
      methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
      credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    })
  );

app.all("/api/auth/*splat", toNodeHandler(auth));



app.use(express.json())

app.use("/api/v1",homeRoute)


// Error handling middleware - MUST be defined after all other app.use() and routes
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log the error stack for debugging - IMPORTANT for server-side

  // Send a generic error response
  res.status(500).json({
    message: 'Something went wrong'
  });
});

app.listen(3001, () => {
    console.log("Server is running on port 3000")
    
})


