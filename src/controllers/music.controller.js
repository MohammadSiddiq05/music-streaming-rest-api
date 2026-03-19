import { musicModel } from "../models/music.model.js";
import { uploadFile } from "../services/storage.service.js";
import { albumModel } from "../models/album.model.js";

const createMusic = async (req, res) => {
    const { title } = req.body
    const file = req.file

    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id
    })

    res.status(201).json({
        message: "music created successfully",
        music: {
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist
        }
    })


}

const createAlbum = async (req, res) => {

    const { title, musics } = req.body

    const album = await albumModel.create({
        title,
        artist: req.user.id,
        musics: musics
    })

    res.status(201).json({
        message: "Album created succefully",
        album: {
            id: album.id,
            title: album.title,
            artist: album.artist,
            musics: album.musics
        }
    })

}

const getAllMusics = async (req, res) => {

    const musics = await musicModel.find().limit(5).populate("artist", "username")

    res.status(200).json({
        message: "Music fetched Successfully",
        musics
    })
}

const getAllAlbums = async (req, res) => {

    const album = await albumModel.find().populate("artist", "username").populate("musics")


    res.status(200).json({
        message: "ALbums fetched Successfully",
        album
    })
}

const getAlbumById = async (req, res) => {
    const albumId = req.params.albumId

    const album = await albumModel.findById(albumId).populate("artist", "username").populate("musics")

    res.status(200).json({
        message: "Album fetched Successfully",
        album
    })
}

export default { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById }