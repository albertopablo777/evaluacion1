const mongoose = require('mongoose');
//definir el esquema
const materiaSchema = new mongoose.Schema({
    // nombre: { type: String, require: true}
    materia: String,
    codmateria:String,
    materiacurso: String,
    usuario: {type: mongoose.Schema.Types.ObjectId,ref: 'usuario'}
});

const materiaModel = mongoose.model('materia',materiaSchema, 'materia');
module.exports = materiaModel;