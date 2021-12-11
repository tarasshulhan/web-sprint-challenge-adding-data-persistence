const db = require('../../data/dbConfig')

function get(){
    return db('resources')
}

async function create(resource) {
    await db('resources').insert(resource)
    return resource
  }

module.exports = {get, create}