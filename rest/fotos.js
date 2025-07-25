var  express = require('express');
var router = express.Router();

const {Sequelize, where, } = require('sequelize');
const Foto = require('../models').foto;
const Etiqueta = require('../models').etiqueta;


router.get('/findAll/json', function(req, res, next) {
  Foto.findAll({
    attributes: { exclude: ["updatedAt"] },
    include: [{
      model: Etiqueta,
      attributes: ['texto'],
      through: { attributes: [] }
    }]
  })
  .then(fotos => {
    res.json(fotos);
  })
  .catch(error => res.status(400).send(error));
});


router.get('/:id/view', function(req, res, next) {
  const id = req.params.id;
  Foto.findByPk(id, {
    include: [{
      model: Etiqueta,
      attributes: ['texto'],
      through: { attributes: [] }
    }]
  })
  .then(foto => {
    if (!foto) return res.status(404).send('Foto no encontrada');
    res.render('foto', { foto });
  })
  .catch(error => res.status(500).send('Error interno del servidor'));
});

router.post('/save', function(req, res, next) {
  let { titulo, descripcion, calificacion, ruta } = req.body;

  Foto.create({
    titulo: titulo,
    descripcion: descripcion,
    calificacion: parseFloat(calificacion),
    ruta: ruta,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(foto => {
    res.json(foto);
  }) 
  .catch(error => {
    res.status(400).send(error);
  });
});

router.put('/update', function(req, res, next) {
    let { id, titulo, descripcion, calificacion, ruta } = req.body;
    Foto.update({
      titulo: titulo,
      descripcion: descripcion,
      calificacion: parseFloat(calificacion),
      ruta: ruta,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      where: {
        id: parseInt
      }
    })
    .then(respuesta => {
      res.json(respuesta);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

router.delete('/delete/:id', function(req, res, next) {
    let id=parseInt(req.params.id);
    Foto.destroy({
      where: {
        id: id
      }
    })
    .then(respuesta => {
      res.json(respuesta);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

module.exports = router;