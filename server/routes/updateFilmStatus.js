import express from "express";
import FilmsDB from "../FilmsDB.js";
// Router to get the list of all Films
const router = express.Router();

router.use(express.urlencoded({extended: true}));

// Looks for post requests to delete something
router.post("/updateFilmStatus", (req,res)=>{
    try {
        FilmsDB.updateStatus(req.body.director, req.body.title, req.body.genre, req.body.screener,req.body.status);
        console.log("Updated Film:", req.body.title);
        res.status(200).json({
        success:true,
        message: "Film status was updated!"
    });
    } catch (error){
        console.error("Error updating film:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to update film status" 
        });

    }
    
});

export default router;