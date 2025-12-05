import express from "express";
import FilmsDB from "../FilmsDB.js";

// Router to get the list of all Films
const router = express.Router();

router.get("/films", async (req, res)=>{
    // Try to get the films that are NOT reviewed
    try {
        const films = await FilmsDB.getFilms({
            $or: [
                { status: { $exists: false } },
                { status: null }
            ]
        });
        res.json({
            films,
        });
    } catch (error){
        console.error("Error getting the unreviewed films", error);
        res.status(500).json({error: "Internal Server Error", films: []});
}
});

router.get("/acceptedFilms", async (req, res)=>{
    // Get films that are reviewed
    try {
        const films = await FilmsDB.getFilms({
            status: "Selected"
        });
        res.json({
            films,
        });

    } catch (error){
        console.error("Error getting the accepted films");
        res.status(500).json({error: "Internal Server Error", films: []});
}
    }
);

export default router; 