const express = require('express')
const helmet = require('helmet')

const server = express()

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Our last Web Sprint!  OH EM GEEE!' })
})

module.exports = server