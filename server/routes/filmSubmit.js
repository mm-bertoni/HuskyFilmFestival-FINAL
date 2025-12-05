import express from "express";
import FilmsDB from "../FilmsDB.js";

const router = express.Router();

router.post("/films", (req, res)=>{
    try{
        FilmsDB.addFilm(
        req.body.director,
        req.body.title,
        req.body.genre,
        req.body.screener
    );
    console.log("Submitted Film Film:" ,req.body.title);
        res.json({success: true});  // Send response
    } catch (error){
        console.error("Error Submitting film:", error);
        res.status(500).json({ error: "Failed to submit film" });
    }
    }
    

 

);

export default router; 