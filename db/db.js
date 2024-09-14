const mongoose = require('mongoose')
require('dotenv').config()
const User = require('../models/user') // Importamos el modelo User

// Conectar a la base de datos
const connect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log('Database connected successfully')
    } catch (error) {
        console.error('Error connecting to the database:', error)
    }
}

connect()
/* Inicia sesión de un usuario utilizando el nombre y la contraseña proporcionados.
Devuelve el objeto de usuario si la autenticación es exitosa.
Lanza un error si el usuario no se encuentra o la contraseña es incorrecta. */
const loginUser = async (name, password) => {
    try {
        const user = await User.findOne({ name }) // Usamos el modelo User
        if (!user) throw new Error('Usuario no encontrado')
        if (user.password !== password) throw new Error('Contraseña incorrecta')
        return user
    } catch (error) {
        throw error
    }
}

/* Obtiene las tareas de un usuario basado en su ID.
Devuelve un arreglo de tareas si el usuario y sus tareas son encontradas.
Lanza un error si el usuario no se encuentra o si las tareas no son un arreglo. */
const getUserTasks = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) throw new Error('Usuario no encontrado')
        return user.tasks
    } catch (error) {
        throw error
    }
}

/* Añade una nueva tarea a la lista de tareas de un usuario.
Devuelve la tarea recién añadida si la operación es exitosa.
Lanza un error si la operación falla. */
const addTask = async (userId) => {
    try {
        const newTask = { name: ' ', type: ' ', status: 0 } // Mongoose generará el _id automáticamente
        const user = await User.findById(userId)
        if (!user) throw new Error('Usuario no encontrado')
        user.tasks.push(newTask)
        await user.save() // Guardamos los cambios
        return user.tasks[user.tasks.length - 1]
    } catch (error) {
        throw error
    }
}


/* Elimina una tarea de la lista de tareas de un usuario.
Devuelve true si la tarea se eliminó correctamente.
Lanza un error si la operación falla. */
const deleteTask = async (userId, taskId) => {
    try {
        const user = await User.findById(userId)
        if (!user) throw new Error('Usuario no encontrado')

        // Usamos ObjectId para comparar el ID de la tarea
        user.tasks = user.tasks.filter(task => !task._id.equals(taskId))
        await user.save() // Guardamos los cambios

        return true
    } catch (error) {
        throw error
    }
}


/* Edita una tarea existente en la lista de tareas de un usuario.
Devuelve true si la tarea se editó correctamente.
Lanza un error si la tarea no se encuentra o la operación falla. */
const editTask = async (userId, updatedTask) => {
    try {
        const user = await User.findById(userId)
        if (!user) throw new Error('Usuario no encontrado')

        const task = user.tasks.id(updatedTask._id) // Usamos el método id() de Mongoose
        if (!task) throw new Error('Tarea no encontrada')

        // Actualizamos las propiedades de la tarea
        task.name = updatedTask.name
        task.type = updatedTask.type
        task.status = updatedTask.status

        await user.save() // Guardamos los cambios

        return true
    } catch (error) {
        throw error
    }
}


module.exports = {
    loginUser,
    getUserTasks,
    addTask,
    deleteTask,
    editTask
}
