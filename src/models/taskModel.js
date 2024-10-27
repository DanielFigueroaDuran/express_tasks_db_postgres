import { pool } from "../config/db.js";

// Selecionar todas las tareas

const getTasks = async () => {
      try {
            const { rows } = await pool.query("SELECT * FROM tasks")
            return rows;
      } catch (error) {
            throw error;
      };
};

const getTasksById = async (id) => {
      try {
            const { rows } = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
            return rows[0];
      } catch (error) {
            throw error;
      }
};

//Funcion para crear una nueva tarea

const createTask = async (task) => {
      const { title, description } = task;
      try {
            const { rows } = await pool.query("INSERT INTO tasks (title,description) VALUES ($1,$2) RETURNING *", [title, description]);
            return rows[0];
      } catch (error) {
            throw error;
      }
};

// Funcion para actualizar tareas

const update = async (id, task) => {
      const { title, description } = task
      try {
            const { rows } = await pool.query("UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *", [title, description, id]);
            return rows[0];
      } catch (error) {
            throw error;
      }
};

// Funcion para Eliminar las tareas

const deleteTask = async (id) => {
      try {
            const { rows } = await pool.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [id]);
            return rows[0];
      } catch (error) {
            throw error;
      }
};

export const taskModel = {
      getTasks,
      getTasksById,
      createTask,
      update,
      deleteTask
}