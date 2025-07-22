var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');
const Etiqueta = require('../models').etiqueta;
const Foto = require('../models').Foto;

/* GET todas las fotos en JSON */
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

/* GET todas las fotos en vista HTML */
router.get('/findAll/view', function(req, res, next) {
  Foto.findAll({
    attributes: { exclude: ["updatedAt"] },
    include: [{
      model: Etiqueta,
      attributes: ['texto'],
      through: { attributes: [] }
    }]
  })
  .then(fotos => {
    res.render('fotos', { title: 'Fotos', arrFotos: fotos });
  })
  .catch(error => res.status(400).send(error));
});

/* GET foto individual en JSON por ID */
router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  Foto.findByPk(id, {
    include: [{
      model: Etiqueta,
      attributes: ['texto'],
      through: { attributes: [] }
    }]
  })
  .then(foto => {
    if (!foto) return res.status(404).json({ mensaje: 'Foto no encontrada' });
    res.json(foto);
  })
  .catch(error => res.status(500).json({ error: 'Error interno del servidor' }));
});

/* GET foto individual en vista HTML por ID */
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

module.exports = router;
