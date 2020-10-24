const express = require('express')
const router = express.Router()
const { Artist, Artwork } = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const artists = await Artist.findAll({
      include: [Artwork],
      order: ['name']
    });
    res.send(artists);
  }
  catch(err) {
    next(err);
  }
})

router.get('/:artistId', async (req, res, next) => {
  try {
    const artist = await Artist.findByPk(req.params.artistId, {include: [Artwork]})
    res.send(artist)
  }
  catch(err) {
    next(err);
  }
})

router.put('/:artistId', async (req, res, next) => {
  try {
    const artist = await Artist.findByPk(req.params.artistId)
    await artist.update(req.body)
    res.send(artist)
  }
  catch(err) {
    next(err);
  }
})

module.exports = router