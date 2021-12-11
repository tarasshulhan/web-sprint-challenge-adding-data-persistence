const db = require('../../data/dbConfig')

function get(){
    return db('tasks')
}

async function create(task) {
    await db('tasks').insert(task)
    return task
  }

module.exports = {get, create}