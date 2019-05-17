const express = require('express')
const helmet = require('helmet')

const server = express()
const Games = require('../games/games-model.js')

server.use(express.json())

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
    const { id } = req.params
    Games.findById(id).then(game => {
        if (!game) {
            res.status(404).json({ errorMessage: 'Game could not be found' })
        }
        res.status(200).json(game)
    }).catch(error => {
        res.status(500).json(error)
    })
})


server.post('/games', async (req, res) => {
    const { title, genre, releaseYear } = req.body
    if (!title || !genre || !releaseYear) {
        res.status(422).json({ message: 'Please provide all info and try again' })
    } else {
        try {
            const game = Games.add(req.body)
            if (game) {
                res.status(200).json({
                    message: 'Game added'
                });
            }
        } catch (error) {
            res.status(405).json({
                message: 'There was an error processing your request.'
            })
        }
    }
})

server.delete('/games/:id', (req, res) => {
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