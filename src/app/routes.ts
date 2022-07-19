import Router from 'express'
import AuthenticateController from './controllers/AuthenticateController'
import ChangePasswordController from './controllers/ChangePasswordController'
import CreateUserController from './controllers/CreateUserController'
import DeleteUserController from './controllers/DeleteUserController'
import { authenticateMiddleware } from './middlewares/authenticateMiddleware'

const router = Router()

router.get('/', (req, res) => { res.status(200).send("MyGrandSon is running") })

//Authentication Routes
router.post('/login', AuthenticateController.handle)

//User Routes
router.post('/users', CreateUserController.handle)
router.delete('/users', authenticateMiddleware,DeleteUserController.handle)

//Config Routes
router.post('/changePassword', authenticateMiddleware, ChangePasswordController.handle)

export default router