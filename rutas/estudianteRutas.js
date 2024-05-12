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

//endpoint 2. Crear
rutas.post('/crear', async (req, res) => {
    const estudiante = new EstudianteModel({
        _apPAT: req.body._apPAT,
        _apMAT: req.body._apMAT,
        _nom1: req.body._nom1,
        _nom2: req.body._nom2,
        _curso: req.body._curso,
        lugnac: req.body.lugnac,
        _edad: req.body._edad
    })
    //console.log(estudiante);
    try {
        const nuevoestudiante = await estudiante.save();
        res.status(201).json(nuevoestudiante);
    } catch (error) {
        res.status(400).json({ mensaje :  error.message})
    }
});
//endpoint 3. Editar
rutas.put('/editar/:id', async (req, res) => {
    try {
        const editaestudiante = await EstudianteModel.findByIdAndUpdate(req.params.id, req.body, { new : true });
        if (!editaestudiante)
            return res.status(404).json({ mensaje : 'Estudiante no encontrado!!!'});
        else
            return res.status(201).json(editaestudiante);
    
     } catch (error) {
        res.status(400).json({ mensaje :  error.message})
    }
});    

//ENDPOINT 4. eliminar
rutas.delete('/eliminar/:id',async (req, res) => {
    try {
       const eliminaestudiante = await EstudianteModel.findByIdAndDelete(req.params.id);
       if (!eliminaestudiante)
            return res.status(404).json({ mensaje : 'Estudiante no encontrado!!!'});
       else 
            return res.json({mensaje :  ' Estudiante eliminado'});    
       } 
    catch (error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

// - 5. encontrar un estudiante por su ID
rutas.get('/buscarestudiante/:id', async (req, res) => {
    try {
        const buscarestudiante = await EstudianteModel.findById(req.params.id);
        if (!buscarestudiante)
            return res.status(404).json({ mensaje : 'Estudiante no encontrado!!!'});
        else 
            return res.json(buscarestudiante);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

// - obtener estudiantes por curso
rutas.get('/estudiantePorCurso/:curso', async (req, res) => {
    try {
        const cursoestudiante = await EstudianteModel.find({_curso:req.params.curso});
        return res.json(cursoestudiante);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

// - eliminar a todos los estudiantes
rutas.delete('/eliminarTodos', async (req, res) => {
    try {
        await EstudianteModel.deleteMany({ });
        return res.json({mensaje: "Todas los estudiantes han sido eliminados"});
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

// - contar el numero total de estudiantes
rutas.get('/totalestudiantes', async (req, res) => {
    try {
        const total = await EstudianteModel.countDocuments();
        return res.json({"CANTIDAD TOTAL DE ESTUDIANTES ": total });
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

// - obtener estudiantes ordenados por apellido paterno ascendente
rutas.get('/ordenarestudiantes', async (req, res) => {
    try {
       const estudiantesordenados = await EstudianteModel.find().sort({ _apPAT: +1});
       res.status(200).json(estudiantesordenados);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

// - obtener estudiantes de un curso ordenados por apellido paterno ascendente
rutas.get('/ordenarestudiantes/:curso', async (req, res) => {
    try {
        const curso = req.params.curso;
        const estudiantesordenados = await EstudianteModel.find({ _curso: curso }).sort({ _apPAT: 1 });
        res.status(200).json(estudiantesordenados);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// buscar estudiantes menores de:
rutas.get('/menoresde/:edad?', async (req, res) => {
    try {
        const edad = parseInt(req.params.edad);
        let filter = {};
        if (edad) {
            filter = { _edad: { $lt: edad } };
        }
        const estudiantesmenoresde = await EstudianteModel.find(filter);
        res.status(200).json(estudiantesmenoresde);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

module.exports = rutas;