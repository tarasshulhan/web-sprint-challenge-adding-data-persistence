const router = require('express').Router()
const Tasks = require("./model")

router.get('/', (req, res, next) => {
    Tasks.get()
        .then(task => {
            res.status(200).json(task)
        })
        .catch(next)
})

module.exports = router