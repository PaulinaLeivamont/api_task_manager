const express = require('express')
const { getTasks, createTask, removeTask, updateTask } = require('../controllers/task-controller')

const router = express.Router()

// Ruta para obtener las tareas de un usuario por su ID
router.get('/:userId', getTasks)

// Ruta para añadir una nueva tarea a un usuario
router.post('/add', createTask)

// Ruta para eliminar una tarea de un usuario
router.delete('/delete', removeTask)

// Ruta para editar una tarea de un usuario
router.put('/edit', updateTask)

module.exports = router
