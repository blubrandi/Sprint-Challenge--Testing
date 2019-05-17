const request = require('supertest')
const server = require('./server.js')

const Games = require('../games/games-model.js')
const db = require('../data/dbConfig.js')

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

    it('should return { message }', async () => {
        const res = await request(server).get('/')
        expect(res.body).toEqual({ message: 'Our last Web Sprint!  OH EM GEEE!' })
    })

    it('should return JSON using done callback', done => {
        request(server)
            .get('/')
            .then(res => {
                expect(res.type).toBe('application/json')
                done()
            })
    })
})

describe('Games JS', () => {

    // beforeEach(async () => {
    //     await db('games').truncate()
    // })

    describe('add()', () => {
        it('should add game', async () => {
            await Games.add({
                title: 'Overwatch',
                genre: 'Multi-player FPS',
                releaseYear: '2016'
            })
        })
    })

    describe('add()', () => {
        it('should add game with response 200', async () => {
            const res = await request(server).post('/games')
            expect(200)
        })
    })

    describe('add()', () => {
        it('should not add game if missing info', async () => {
            const res = await request(server).post('/games')
            expect(422)
        })
    })
})
