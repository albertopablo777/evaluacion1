const express = require('express');
const rutas = express.Router();
const EstudianteModel = require('../models/estudiante');

//endpoint 1.  traer todos los estudiantes
rutas.get('/getestudiante', async (req, res) => {
    try  {
        const estudiante = await  EstudianteModel.find();
        res.json(estudiante);
    } catch (error){
        res.status(500).json({mensaje: error.message});
    }
});
module.exports = rutas;