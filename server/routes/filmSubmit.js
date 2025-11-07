import express from "express";
import FilmsDB from "../FilmsDB.js";

const router = express.Router();

router.post("/films", (req, res)=>{
    FilmsDB.addFilm(
        req.body.director,
        req.body.title,
        req.body.genre,
        req.body.screener
    );

    console.log("New film submitted");

})

export default router; 