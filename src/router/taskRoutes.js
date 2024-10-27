import { Router } from "express";
import { taskController } from "../controllers/taskController.js";
import { body, param, validationResult } from "express-validator";// esta importación es para validar las rutas que no esten vacias

const validateBodyTask = [
      body("title")
            .isLength({ min: 1 }).withMessage("Title en requerido")// de esta forma le decimos que como minimo tiene que tener 1 caracter
            .trim() // con este codigo eliminamos los espacios en blanco
            .escape(), // con este codigo eliminamos las inyecciones SQL 
      body("description")
            .optional() // este quiere decir que es opcional
            .isString().withMessage("Descripción tiene que ser un string")
            .trim()
            .escape()
];

const validateParamTaskId = [
      param("id")// el parametro que vamos a validar es el Id
            .isInt({ gt: 0 }).withMessage("El id de la tarea tiene que ser mayor que 0 y valor positivo")
            .toInt() // con este codigo lo convertimos a valor entero
]

const router = Router();

router.get('/', taskController.getTasks);
router.get('/:id', validateParamTaskId, taskController.getTasksById);
router.post('/', validateBodyTask, taskController.createTask);
router.put('/:id', validateParamTaskId.concat(validateBodyTask), taskController.updateTask);// con este codigo validamos por el id y despues valida el taskBody
router.delete('/:id', validateParamTaskId, taskController.deleteTask);

export default router