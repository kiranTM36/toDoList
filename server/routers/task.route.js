const { addTask, showTasks, showUserTask, updateComplete, updatePriority } = require('../controllers/taskController')
const auth = require('../middleware/authorize')
const router = require('express').Router()

router.post('/add' ,auth('user'), addTask)

router.get('/' , showTasks)

router.get('/:id' , showUserTask)

router.put('/update/:id' , updateComplete)

router.put('/priority/:id' , updatePriority)

module.exports = router