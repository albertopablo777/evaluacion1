const express = require('express');
const request = require('supertest');
const estudianteRutas = require('../../rutas/estudianteRutas');
const EstudianteModel = require('../../models/estudiante');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use('/estudiante', estudianteRutas);

describe('Pruebas Unitarias para estudiantes', () => {
    //se ejecuta antes de iniciar las pruebas
    beforeEach(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/inscripcionEST');
        await EstudianteModel.deleteMany({});
    });
    // al finalizar las pruebas
    afterAll(() => {
        return mongoose.connection.close();
      });
    
     //1er test : GET
     test('Deberia Traer todas los estudiantes metodo: GET: getestudiante', async() =>{
        await EstudianteModel.create({ _apPAT: 'morales', _apMAT: 'morales', _nom1: 'juan',_nom2:'jose',_curso:'6a',lugnac:'oruro',_edad:'17'});
        await EstudianteModel.create({ _apPAT: 'perez', _apMAT: 'perez', _nom1: 'juan',_nom2:'jose',_curso:'6b',lugnac:'oruro',_edad:'18'});
        // solicitud - request
        const res =  await request(app).get('/estudiante/getestudiante');
        //verificar la respuesta
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(2);
    }, 10000);  
    //2do test : POST 
    test('Deberia agregar un nuevo estudiante: POST: /crear', async() => {
        const nuevoEstudiante = {
            _apPAT: 'dias',
            _apMAT: 'oscuros',
            _nom1: 'sonde',
            _nom2: 'noche',
            _curso: '5b',
            lugnac: 'la paz',
            _edad: '16' 
        };
        const res =  await request(app)
                            .post('/estudiante/crear')
                            .send(nuevoEstudiante);
        expect(res.statusCode).toEqual(201);
        expect(res.body._apPAT).toEqual(nuevoEstudiante._apPAT);
    });
    test('Deberia actualizar un estudiante que ya existe: PUT /editar/:id', async()=>{
        const estudianteCreado = await EstudianteModel.create(
                                  {  _apPAT: 'dias',
                                     _apMAT: 'oscuros',
                                    _nom1: 'sonde',
                                    _nom2: 'noche',
                                    _curso: '5b',
                                    lugnac: 'la paz',
                                    _edad: '16'});
        const estudianteActualizar = {
            _apPAT: 'dias (editado)',
            _apMAT: 'oscuros (editado)',
            _nom1: 'sonde (editado)',
            _nom2: 'noche (editado)', 
            _curso: '5b (editado)',
            lugnac: 'la paz (editado)',
            _edad: '16',
            usuario: {type: mongoose.Schema.Types.ObjectId, ref:'usuario'}
        };
        const res =  await request(app)
                            .put('/estudiante/editar/'+estudianteCreado._id)
                            .send(estudianteActualizar);
        expect(res.statusCode).toEqual(201);
        expect(res.body._apPAT).toEqual(estudianteActualizar._apPAT);                   
    });
    test('Deberia eliminar un estudiante existente : DELETE /eliminar/:id', async() =>{
        const estudianteCreado = await EstudianteModel.create(
            { _apPAT: 'dias (editado)',
            _apMAT: 'oscuros (editado)',
            _nom1: 'sonde (editado)',
            _nom2: 'noche (editado)',
            _curso: '5b (editado)',
            lugnac: 'la paz (editado)',
            _edad: '16' });
        const res =  await request(app)
                                .delete('/estudiante/eliminar/'+estudianteCreado._id);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({mensaje:' Estudiante eliminado'});
    });   
});