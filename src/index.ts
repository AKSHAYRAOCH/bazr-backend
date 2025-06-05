import express from "express";
import { config } from "dotenv";


config()
const app = express()

app.get("/", async (req, res) => {
    res.send("Hello World")
    
    
});

app.post("/send", async (req, res) => {
    res.send("Hello World")
    
});

app.listen(3000, () => {
    console.log("Server is running on port 3000")
    console.log(process.env.POSTGRES_URL)
})