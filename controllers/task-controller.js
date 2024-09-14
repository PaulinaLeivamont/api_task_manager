const { getUserTasks, addTask, deleteTask, editTask } = require('../db/db')

const getTasks = async (req, res, next) => {
    const { userId } = req.params

    try {
        const tasks = await getUserTasks(userId)
        res.status(200).json(tasks) // Usa 200 para indicar que la solicitud fue exitosa
    } catch (error) {
        next(error) // Pasa el error al middleware de manejo de errores
    }
}

const createTask = async (req, res, next) => {
    const { userId } = req.body

    try {
        const task = await addTask(userId)
        res.status(200).json(task)
    } catch (error) {
        next(error)
    }
}

const removeTask = async (req, res, next) => {
    const { userId, taskId } = req.body

    try {
        const deleted = await deleteTask(userId, taskId)
        res.status(200).json({ success: deleted })
    } catch (error) {
        next(error)
    }
}

const updateTask = async (req, res, next) => {
    const { userId, task } = req.body

    try {
        const updated = await editTask(userId, task)
        res.status(200).json({ success: updated })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getTasks,
    createTask,
    removeTask,
    updateTask,
}
