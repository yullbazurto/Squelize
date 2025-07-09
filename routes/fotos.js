var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');
const Foto = require('../models').Foto;

/* GET home page. */
router.get('/findAll/json', function(req, res, next) {
  Foto.findAll({
    attributes: { exclude: ["updatedAt"] }
  })
  .then(fotos => {
    res.json(fotos);
  })
  .catch(error => res.status(400).send(error))

});

router.get('/findAll/view', function(req, res, next) {
  Foto.findAll({  
    attributes: { exclude: ["updatedAt"] },
  }) 
  .then(fotos => {
    res.render('fotos', { title: 'Fotos', arrFotos: fotos });
  })
  .catch(error => res.status(400).send(error));
});


module.exports = router;