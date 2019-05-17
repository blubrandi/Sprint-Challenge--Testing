const db = require('../data/dbConfig.js');

module.exports = {
    add,
    remove,
    find,
    findBy,
    findById,
};

function find() {
    return db('games').select('id', 'title', 'genre', 'releaseYear');
}

function findBy(filter) {
    return db('games').where(filter);
}

function findById(id) {
    return db('games')
        .where({ id })
        .first();
}

async function add(game) {
    const [id] = await db('games').insert(game);

    return findById(id);
}

function remove(id) {
    return db('games')
        .where('id', id)
        .del();
}
