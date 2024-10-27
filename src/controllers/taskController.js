import { taskModel } from "../models/taskModel.js";
import { validationResult } from "express-validator";

// Buscar todas las tareas
const getTasks = async (req, res, next) => {
      try {
            const tasks = await taskModel.getTasks();
            res.json(tasks);
      } catch (error) {
            // res.status(500).json({ error: error.message });
            next(error);
      }
};

// buscar tareas por Id

const getTasksById = async (req, res, next) => {
      const errors = validationResult(req);// con este codigo si ocurrio un error lo rescatamos de esta manera
      if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // se coloca array por que puede haver mas de dos errores
      }

      try {
            const task = await taskModel.getTasksById(req.params.id);
            if (!task) {
                  return res.status(404).json({ error: "Tarea no encontrada" });
            }
            res.json(task);
      } catch (error) {
            // res.status(500).json({ error: error.message });
            next(error);
      }
};

// Crear nueva tarea 

const createTask = async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
      };

      try {
            const newTask = await taskModel.createTask(req.body);
            res.status(201).json(newTask);
      } catch (error) {
            // res.status(500).json({ error: error.message });
            next(error);
      }
};

// Actualizar tarea

const updateTask = async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
      };

      try {
            const updateTask = await taskModel.update(req.params.id, req.body);
            if (!updateTask) {
                  return res.status(404).json({ error: "Tarea no encontrada" })
            };
            res.json(updateTask);
      } catch (error) {
            // res.status(500).json({ error: error.message })
            next(error);
      }
};

// Eliminar tareas

const deleteTask = async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
      };

      try {
            const deleteTasks = await taskModel.deleteTask(req.params.id);
            if (!deleteTasks) {
                  return res.status(404).json({ error: "Tarea no encontrada" });
            };
            res.json({ message: "Tarea Eliminada", tarea_eliminada: deleteTasks });
      } catch (error) {
            // res.status(500).json({ error: error.message });
            next(error);
      }
};

export const taskController = {
      getTasks,
      getTasksById,
      createTask,
      updateTask,
      deleteTask
}
