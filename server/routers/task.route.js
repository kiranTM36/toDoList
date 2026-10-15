const {addTask, showTasks, showUserTask, updateComplete, updatePriority, showOtherTask } = require('../controllers/taskController');

const { authenticate ,authorize } = require('../middleware/authorize');

const router = require('express').Router();

router.post('/add', authorize, authenticate('user'), addTask);


router.get('',authorize, showUserTask);

router.put('/update/:id', authorize, updateComplete);

router.put('/priority/:id', authorize, updatePriority);

router.get('/:id' , authorize, authenticate('admin'), showOtherTask)

module.exports = router;
