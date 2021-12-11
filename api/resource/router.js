const router = require('express').Router()
const Resources = require("./model")

router.get('/', (req, res, next) => {
    Resources.get()
        .then(resource => {
            res.status(200).json(resource)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    Resources.create(req.body)
    .then(resource => {
        res.status(200).json(resource)
    })
    .catch(next)
})
module.exports = router