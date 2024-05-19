////---------USUARIO---------
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//definir el esquema
const usuarioSchema = new mongoose.Schema({
    // nombre: { type: String, require: true}
    nombreusuario: {
        type : String,
        required : true,
        unique : true
    },
    correo : {
        type : String,
        required : true,
        unique : true
    },
    contrasenia: {
        type : String,
        required : true,
    }
});
const usuarioModel = mongoose.model('usuario',usuarioSchema, 'usuario');
//hashear contrasenia
usuarioSchema.pre('save', async function (next){
    if (this.isModified('contrasenia')){
        this.contrasenia = await bcrypt.hash(this.contrasenia, 10);
        console.log(this.contrasenia);
    }
    next();
});
//comparar contrasenias
usuarioSchema.methods.compararContrasenia = async function (contraseniacomparar){
    return await bcrypt.compare (contraseniacomparar, this.contrasenia);
}

const UsuarioModel = mongoose.model('Usuario',usuarioSchema, 'usuario');
module.exports = UsuarioModel;
