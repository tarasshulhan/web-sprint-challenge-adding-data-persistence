const db = require('../../data/dbConfig')

function get(){
    return db.select('*').from('tasks').leftJoin('projects','tasks.project_id', 'projects.project_id')
}

const getById = (id) => {
  return db('tasks').where('task_id', id).first()
}

async function create(task) {
    const id = await db('tasks').insert(task)
    return getById(id)
  }

module.exports = {get, getById, create}