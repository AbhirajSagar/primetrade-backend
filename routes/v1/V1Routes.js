import express from 'express'

import AuthRoutes from '../v1/AuthRoutes.js'
import TaskRoutes from '../v1/TaskRoutes.js'
import AuthMiddleware from '../../middleware/AuthMiddleware.js';

const router = express.Router()

router.use('/auth', AuthRoutes)
router.use('/tasks', AuthMiddleware, TaskRoutes)


export default router;