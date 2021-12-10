const router = require('express').Router()
const Projects = require("./model")

router.get('/', (req, res, next) => {
    Projects.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(next)
})

module.exports = router