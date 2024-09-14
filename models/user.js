const mongoose = require('mongoose')

// Definir el esquema de la tarea
const taskSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: Number, required: true },
})

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    tasks: [taskSchema] // Un usuario tiene una lista de tareas
})

// Crear el modelo basado en el esquema
const User = mongoose.model('User', userSchema, 'users')

module.exports = User