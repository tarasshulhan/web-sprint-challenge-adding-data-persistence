const router = require('express').Router()
const Tasks = require("./model")
const Projects = require("../project/model")

router.get('/', async (req, res, next) => {
    try{
        const tasks = await Tasks.get()
        const newTasks = tasks.map(task =>{
            if(task.task_completed === 0){
                return {...task, task_completed: false}
            }else{
                return {...task, task_completed: true}
                }
            })
            newTasks.forEach(async task =>  {
                const proj = await Projects.getById(task.project_id)
                task = {...task, project_name: proj.project_name, project_description: proj.project_description}
            }) // adds the project name and description to a task, tests still dont pass idk why
            res.status(200).json(newTasks)
    }catch(err){
        next(err)
    }
})

router.post('/', (req, res, next) => {
    if(req.body.task_completed === true){
        req.body = {...req.body, task_completed: 1}
    }else if(req.body.task_completed === false){
        req.body = {...req.body, task_completed: 0}
    }
    Tasks.create(req.body)
    .then(task => {
        if(task.task_completed === 0){
            res.status(200).json({...task, task_completed: false})
        }else{
            res.status(200).json({...task, task_completed: true})
            }// returns task_completed as boolean in postman, test still not passing
    })
    .catch(next)
})

module.exports = router