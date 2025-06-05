import express, { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import db from "./db/db";
import { usersTable } from "./db/schema";


config()
const app = express()
app.use(express.json())

app.get("/getusers", async (req, res) => {
    const users = await db.select().from(usersTable)
    res.json({
        users
    })
    
    
});

app.post("/adduser",async (req,res)=>{
    const data = req.body;
    const inserted = await db.insert(usersTable).values({name:data.name,age:data.age,email: data.email}).returning()
    
    res.json({
        message:"User added successfully"
    })
    
})



// Error handling middleware - MUST be defined after all other app.use() and routes
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log the error stack for debugging - IMPORTANT for server-side

  // Send a generic error response
  res.status(500).json({
    message: 'Something went wrong'
  });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000")
    console.log(process.env.POSTGRES_URL)
})