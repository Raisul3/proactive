import { Router } from 'express'
import { taskController } from '../controllers/taskController.js'
import { requireAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { createTaskRules, updateTaskRules, taskIdRules, listTaskRules } from '../validators/taskValidators.js'

const router = Router()
router.use(requireAuth)
router.get('/', listTaskRules, validate, taskController.list)
router.post('/', createTaskRules, validate, taskController.create)
router.patch('/:id', updateTaskRules, validate, taskController.update)
router.delete('/:id', taskIdRules, validate, taskController.remove)

export default router
