import { Router } from "express";
import { taskController } from "../controllers/taskController.js";
import { body, param, validationResult } from "express-validator";

const validateBodyTask = [
      body("title")
            .isLength({ min: 1 }).withMessage("Title en requerido")
            .trim()
            .escape(),
      body("description")
            .optional()
            .isString().withMessage("Descripción tiene que ser un string")
            .trim()
            .escape()
];

const validateParamTaskId = [
      param("id")
            .isInt({ gt: 0 }).withMessage("El id de la tarea tiene que ser mayor que 0 y valor positivo")
            .toInt()
];

const router = Router();

router.get('/', taskController.getTasks);
router.get('/:id', validateParamTaskId, taskController.getTasksById);
router.post('/', validateBodyTask, taskController.createTask);
router.put('/:id', validateParamTaskId.concat(validateBodyTask), taskController.updateTask);// con este codigo validamos por el id y despues valida el taskBody
router.delete('/:id', validateParamTaskId, taskController.deleteTask);

export default router