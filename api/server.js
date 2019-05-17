const express = require('express')
const helmet = require('helmet')

const server = express()
const Games = require('../games/games-model.js')

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Our last Web Sprint!  OH EM GEEE!' })
})

server.get('/games', (req, res) => {
    Games.find()
        .then(games => {
            res.status(200).json(games)
        })
        .catch(err => res.send(err))
})

server.get('/games/:id', (req, res) => {
    Games.findById(req.params.id)
        .then(game => {
            res.status(200).json(game)
        })
        .catch(err => res.send(err))
})

server.post('/games', (req, res) => {
    const { title, genre, releaseYear } = req.body
    if (!title || !genre || !releaseYear) {
        res.status(422).json({ message: 'Game info incomplete' })
    } else {
        Games.add({ title, genre, releaseYear }).then(game => {
            res.status(200).json({ game })
        }).catch(error => {
            res.status(500).json(error)
        })
    }

})

server.delete('/songs/:id', (req, res) => {
    const id = req.params.id

    Games.remove(id)
        .then(game => {
            res.json({ message: 'Your game has been deleted' })
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'There was a problem deleting your game' })
        })
})


module.exports = server