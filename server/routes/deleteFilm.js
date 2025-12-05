import express from "express";
import FilmsDB from "../FilmsDB.js";
// Router to get the list of all Films
const router = express.Router();

router.use(express.urlencoded({extended: true}));

// Looks for post requests to delete something
router.post("/deleteFilm", (req,res)=>{
    try{
        FilmsDB.deleteFilm(req.body.director, req.body.title,req.body.genre, req.body.screener);
        console.log("Deleted Film:" ,req.body.title);
        res.json({success: true});  // Send response
    } catch (error){
        console.error("Error deleting film:", error);
        res.status(500).json({ error: "Failed to delete film" });
    }
});

export default router; 