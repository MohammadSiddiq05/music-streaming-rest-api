import express from "express"
import musicController from "../controllers/music.controller.js";
import multer, { memoryStorage } from "multer";
import authMiddleware from "../middlewares/auth.middleware.js";

const upload = multer({
    storage: memoryStorage()
})

export const musicRoutes = express.Router();

musicRoutes.post("/create", authMiddleware.authArtist, upload.single('music'), musicController.createMusic)
musicRoutes.post('/album', authMiddleware.authArtist, musicController.createAlbum)
musicRoutes.get("/", authMiddleware.authUser, musicController.getAllMusics)
musicRoutes.get("/albums", authMiddleware.authArtist, musicController.getAllAlbums)
musicRoutes.get("/albums/:albumId", authMiddleware.authArtist, musicController.getAlbumById)