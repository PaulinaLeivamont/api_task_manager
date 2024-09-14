const express = require('express')
const cors = require('cors')
require('dotenv').config()

const userRoutes = require('./routes/user-routes')
const taskRoutes = require('./routes/task-routes')

const app = express()
const port = process.env.PORT || 3000

// Middlewares
app.use(cors())
app.use(express.json())

// Rutas
app.use('/user', userRoutes)
app.use('/tasks', taskRoutes)

// Manejo de errores 404
app.use((req, res, next) => {
    res.status(404).json({
        error: 'Ups, URL no encontrada'
    })
})

// Middleware de manejo de errores 500
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        error: 'Lo sentimos, vuelva a intentarlo en otro momento'
    })
})

app.listen(port, () => {
    console.log(`${port}`)
})