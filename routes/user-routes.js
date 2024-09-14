const express = require('express')
const { login } = require('../controllers/user-controller')

const router = express.Router()

// Ruta para el login de usuario
router.post('/login', login)

module.exports = router
