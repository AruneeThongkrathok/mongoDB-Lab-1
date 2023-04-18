const express = require('express')
const mongoose = require("mongoose")
const bodyparser = require ('body-parser')
require('dotenv').config()
const musicAlbums = require('./models/musicAlbums')

const port = process.env.PORT || 3000
const uri = process.env.URI 

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true} )
.then(() => console.log('MongoDB and Mongoose connected!'))
.catch(error => console.log('Error in connection', error))

const app = express()
app.use(express.json())
app.use(bodyparser.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/albums', async(req, res) =>
{
    try {
        const albums = await musicAlbums.find()
        res.json(albums)
    } catch (error) {
        res.status(500).json({message: "error in getting albums."})
    }
}
)

app.get('/api/albums/:id', async(req, res) =>
{
    try {
        const album = await musicAlbums.find({_id: req.params.id})
        if (album.length > 0)
        res.status(201).json(album)
        else 
            res.status(404).json({message: "The Album is not found"})
    } catch (error) {
        res.status(500).json({message: "error in getting albums."})
    }
}
)

app.post('/api/albums', async (req, res) => {
    try {
      const newAlbum = await musicAlbums.create(req.body);
      res.status(201).json(newAlbum);
    } catch (error) {
      res.status(500).json({ message: 'Error creating album.' });
    }
});

app.put('/api/albums/:id', async (req, res) => {
  const id = req.params.id;
  const updatedAlbum = {
    title: req.body.title,
    artist: req.body.artist,
    year: req.body.year
  };

  try {
    const album = await musicAlbums.findByIdAndUpdate(id, updatedAlbum, { new: true });
    res.json(album);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.delete('/api/albums/:id', async (req, res) => {
    try {
      const deletedAlbum = await musicAlbums.deleteOne({ _id: req.params.id });
      res.json(deletedAlbum);
    } catch (error) {
      res.status(500).json({ message: 'Error deleting album.' });
    }
  });


app.listen(port, console.log('The appp is running on http://localhost:' + port))
