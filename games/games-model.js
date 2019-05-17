const db = require('../data/dbConfig.js');

module.exports = {
    add,
    remove,
    find,
    findBy,
    findById,
};

function find() {
    return db('test').select('id', 'title', 'genre', 'releaseYear');
}

function findBy(filter) {
    return db('test').where(filter);
}

function findById(id) {
    return db('test')
        .where({ id })
        .first();
}

async function add(game) {
    const [id] = await db('test').insert(game);

    return findById(id);
}

function remove(id) {
    return db('test')
        .where('id', id)
        .del();
}
