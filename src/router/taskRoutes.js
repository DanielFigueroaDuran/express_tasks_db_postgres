import { Router } from "express";
import { taskController } from "../controllers/taskController.js";
import { body, param, validationResult } from "express-validator";

const router = Router();

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

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtiene todas las tareas
 *     responses:
 *       200:
 *         description: Lista de todas las tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */

router.get('/', taskController.getTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtiene una tarea por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Lista de todas las tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarea no encontrada
 */
router.get('/:id', validateParamTaskId, taskController.getTasksById);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crea una nueva tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Lista de todas las tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error de validación
 */

router.post('/', validateBodyTask, taskController.createTask);

/**
 * @swagger
 * /tasks:
 *   put:
 *     summary: Actualiza una tarea existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Lista de todas las tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarea no encontrada
 *       400:
 *         description: Error de validación
 */
router.put('/:id', validateParamTaskId.concat(validateBodyTask), taskController.updateTask);// con este codigo validamos por el id y despues valida el taskBody

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Elimina una tarea existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *       404:
 *         description: Tarea no encontrada
 */

router.delete('/:id', validateParamTaskId, taskController.deleteTask);

export default router