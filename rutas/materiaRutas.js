const express = require('express');
const rutas = express.Router();
const MateriaModel = require('../models/materia');
const UsuarioModel = require('../models/Usuario');

//endpoint 1.  traer todas las materias
rutas.get('/getmateria', async (req, res) => {
    try  {
        const materia = await  MateriaModel.find();
        res.json(materia);
    } catch (error){
        res.status(500).json({mensaje: error.message});
    }
});

//endpoint 2. Crear
rutas.post('/crear', async (req, res) => {
    const materia = new MateriaModel({
        materia: req.body.materia,
        codmateria: req.body.codmateria,
        materiacurso: req.body.materiacurso,
        usuario: req.usuario //asignar el id del usuario
    })
    try {
        const nuevamateria = await materia.save();
        res.status(201).json(nuevamateria);
    } catch (error) {
        res.status(400).json({ mensaje :  error.message})
    }
});

//endpoint 3. Editar
rutas.put('/editar/:id', async (req, res) => {
    try {
        const editaMateria = await MateriaModel.findByIdAndUpdate(req.params.id, req.body, { new : true });
        if (!editaMateria)
            return res.status(404).json({ mensaje : 'Materia no encontrada!!!'});
        else
            return res.status(200).json(editaMateria);
    } catch (error) {
        res.status(500).json({ mensaje :  error.message});
    }
});

//endpoint 4. Eliminar
rutas.delete('/eliminar/:id', async (req, res) => {
    try {
        const materia = await MateriaModel.findByIdAndDelete(req.params.id);
        if (!materia)
            return res.status(404).json({ mensaje : 'Materia no encontrada!!!'});
        else
            return res.status(200).json(materia);
    } catch (error) {
        res.status(500).json({ mensaje :  error.message});
    }
});

//REPORTES 1
rutas.get('/materiaPorUsuario/:usuarioId', async (req, res) =>{
    const {usuarioId} = req.params;
    console.log(usuarioId);
    try{
        const usuario = await UsuarioModel.findById(usuarioId);
        if (!usuario)
            return res.status(404).json({mensaje: 'usuario no encontrado'});
        const materia = await MateriaModel.find({ usuario: usuarioId}).populate('usuario');
        res.json(materia);

    } catch(error){
        res.status(500).json({ mensaje :  error.message})
    }
});

//REPORTES 2
rutas.get('/materiasAsignadas/:usuarioId', async (req, res) =>{
    const {usuarioId} = req.params;
    console.log(usuarioId);
    try{
        const usuario = await UsuarioModel.findById(usuarioId);
        if (!usuario)
            return res.status(404).json({mensaje: 'usuario no encontrado'});
        const materias = await MateriaModel.find({ usuario: usuarioId});
        if (materias.length === 0)
            return res.status(404).json({mensaje: 'no se encontraron materias asignadas al usuario'});
        const materiasAsignadas = materias.map(materia => materia.codmateria);
        res.json({materiasAsignadas});

    } catch(error){
        res.status(500).json({ mensaje :  error.message})
    }
});

module.exports = rutas;