const { loginUser } = require('../db/db')

const login = async (req, res, next) => {
    const { name, password } = req.body

    try {
        const user = await loginUser(name, password)
        res.status(200).json({ id: user._id, name: user.name, tasks: [] }) // Respuesta de éxito
    } catch (error) {
        next(error) // Pasa el error al middleware de manejo de errores
    }
}


module.exports = {
    login,
}
