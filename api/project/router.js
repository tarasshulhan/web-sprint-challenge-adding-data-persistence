const router = require('express').Router()
const Projects = require("./model")

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            const newProjects = projects.map(project =>{
                if(project.project_completed === 0){
                    return {...project, project_completed: false}
                }else{
                    return {...project, project_completed: true}
                }
            })
            res.status(200).json(newProjects)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    if(req.body.project_completed === true){
        req.body = {...req.body, project_completed: 1}
    }else if(req.body.project_completed === false){
        req.body = {...req.body, project_completed: 0}
    }
    Projects.create(req.body)
    .then(project => {
        if(project.project_completed === 0){
            res.status(200).json({...project, project_completed: false})
        }else{
            res.status(200).json({...project, project_completed: true})
            } // returns project_completed as boolean in postman, test still not passing
    })
    .catch(next)
})

module.exports = router