const express = require('express');
const request = require('supertest');
const materiaRutas = require('../../rutas/materiaRutas');
const materiaModel = require('../../models/materia');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use('/materia', materiaRutas);

describe('Pruebas Unitarias para materias', () => {
    //se ejecuta antes de iniciar las pruebas
    beforeEach(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/inscripcionEST');
        await materiaModel.deleteMany({});
    });
    // al finalizar las pruebas
    afterAll(() => {
        return mongoose.connection.close();
      });
    
     //1er test : GET
     test('Deberia Traer todas las materias metodo: GET: getmateria', async() =>{
        await materiaModel.create({materia:'ciencia', codmateria:'ciencia101', materiacurso: '55', usuario:'66495f988713a84c42a7497d'});
        //await materiaModel.create({ });
        // solicitud - request
        const res =  await request(app).get('/materia/getmateria');
        //verificar la respuesta
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(2);
    }, 10000);
});  