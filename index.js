require('dotenv').config()

const server = require('./api/server.js')

const port = process.env.PORT || 3600

server.listen(port, () => {
    console.log(`Server is running on port ${port}, cause I FREAKING DID IT!`)
})