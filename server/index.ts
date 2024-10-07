
import express from "express";
const app = express();
import mongoose from "mongoose";
const port = 3000;
import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todo";
const cors = require("cors")

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);


async function main(){ 
     
 await mongoose.connect('mongodb+srv://ajeetgupta:ajeetgupta@cluster0.vz77r.mongodb.net/todo-app-db', { dbName: "todo-app-db" });
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})
}

main()


