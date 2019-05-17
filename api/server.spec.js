const request = require('supertest')
const server = require('./server.js')

describe('Server', () => {

    it('sets the environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })

    describe('GET /', () => {
        it('Should receive 200 response', () => {
            return request(server)
                .get('/')
                .expect(200);
        })
    })


})
