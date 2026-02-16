import express from 'express'

import 
{ 
    ListAllTasks,
    GetTaskById,
    CreateTask,
    UpdateTask,
    DeleteTaskById
} 
from '../../controllers/TaskController.js'


const router = express.Router()

router.get('/', ListAllTasks)
router.get('/:id', GetTaskById)
router.post('/create', CreateTask)
router.put('/:id', UpdateTask)
router.delete('/:id', DeleteTaskById)

export default router;