const { createUser, getAllUser, getSingleUser, deleteUser, updateUser, Login, logOut } = require('../controllers/userController')
const { authenticate, authorize } = require('../middleware/authorize')
const multer = require('../middleware/multer')
const router = require('express').Router()
//const auth = require('../middleware/authorize')

router.post('/add' , createUser)

router.get('/view', authorize , authenticate('admin') , getAllUser)

router.get('/view/:id', authorize , authenticate('user') , getSingleUser)

router.delete('/delete/:id' , deleteUser)

router.put('/edit/:id', multer.single('image') , updateUser)

router.post('/login' , Login)

router.post('/logout' , logOut)

module.exports = router