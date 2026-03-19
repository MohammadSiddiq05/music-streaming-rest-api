import ImageKit from "@imagekit/nodejs";


const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});


export const uploadFile = async (file) => {

    const result = await client.files.upload({
        file,
        fileName : "music_" + Date.now(),
        folder: "all-musics"
    })

    return result
}
