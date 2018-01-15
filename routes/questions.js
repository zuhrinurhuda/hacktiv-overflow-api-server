const router = require('express').Router()
const question = require('../controllers/questionController')
const checkAuth = require('../middleware/checkAuth')

router.post('/', checkAuth.isLogin, question.create)
router.get('/', question.findAll)
router.get('/:id', question.findById)
router.put('/:id', checkAuth.isLogin, question.update)
router.delete('/:id', checkAuth.isLogin, question.delete)

module.exports = router