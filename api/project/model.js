const db = require('../../data/dbConfig')

function get(){
    return db('projects')
}

const getById = (id) => {
  return db('projects').where('project_id', id).first()
}

async function create(project) {
    await db('projects').insert(project)
    return project
  }

module.exports = {get, getById, create}