const { addTask, showTasks } = require('../controllers/taskController')
const auth = require('../middleware/authorize')
const router = require('express').Router()

router.post('/add' ,auth('user'), addTask)

router.get('/' , showTasks)

module.exports = router