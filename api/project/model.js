const db = require('../../data/dbConfig')

function get(){
    return db('projects')
}

const getById = (id) => {
  return db('projects').where('project_id', id).first()
}

async function create(project) {
    const id = await db('projects').insert(project)
    return getById(id)
  }

module.exports = {get, getById, create}