var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');
const Etiqueta = require('../models').etiqueta;
const Foto = require('../models').Foto;

/* GET home page. */
router.get('/findAll/json', function(req, res, next) {
  Foto.findAll({
    attributes: { exclude: ["updatedAt"] },
    include: [{
      model: Etiqueta,
      attributes:['texto'],
      through: {
        attributes:[]
      }
    }]
  })
  .then(fotos => {
    res.json(fotos);
  })
  .catch(error => res.status(400).send(error))

});

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




module.exports = router;