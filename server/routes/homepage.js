const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send({String: 'homepage'})
})

module.exports = router