import Router from 'express'
import CreateUserController from './controllers/CreateUserController'
import DeleteUserController from './controllers/DeleteUserController'

const router = Router()

router.get('/', (req, res) => { res.status(200).send("MyGrandSon is running") })

//User Routes
router.post('/users', CreateUserController.handle)
router.delete('/users', DeleteUserController.handle)

export default router