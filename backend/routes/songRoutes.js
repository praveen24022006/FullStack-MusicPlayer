import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getPlaylistByTag,
  getSongs,
  searchSongs,
  toggleFavourite,
} from "../controllers/songController.js";const songRouter = express.Router();
songRouter.get("/",getSongs);
songRouter.get("/playlistByTag/:tag",getPlaylistByTag);
songRouter.post("/favourite",protect,toggleFavourite);
songRouter.get("/search/:query", searchSongs);
songRouter.get("/favourites",protect,(req,res)=>{
    res.json(req.user.favourites);
})
export default songRouter;