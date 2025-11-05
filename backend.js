import express from "express";
import cors from "cors"
import ticketsRouter from "./server/routes/tickets.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/tickets", ticketsRouter)
app.use(express.static("../frontend/dist"))


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})