const mongoose = require ('mongoose')

const musicAlbumsSchema = new mongoose.Schema(
    {
        title: {type: String, require: true, unique: true}, 
        artist: String ,
        year: String
    }
)

module.exports = new mongoose.model('musicAlbums', musicAlbumsSchema)