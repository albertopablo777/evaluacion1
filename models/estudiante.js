const mongoose = require('mongoose');
//definir el esquema
const estudianteSchema = new mongoose.Schema({
    // nombre: { type: String, require: true}
    _apPAT: String,
    _apMAT: String,
    _nom1: String,
    _nom2: String,
    _edad: Number 
});

const EstudianteModel = mongoose.model('Estudiante',estudianteSchema, 'estudiante');
module.exports = EstudianteModel;