const db = require('../../data/dbConfig')

function get(){
    return db.select('*').from('tasks').leftJoin('projects','tasks.project_id', 'projects.project_id')
}

async function create(task) {
    await db('tasks').insert(task)
    return task
  }

module.exports = {get, create}