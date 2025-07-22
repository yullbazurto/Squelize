'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Foto extends Model {
    static associate(models) {
      // Relación: una foto tiene muchas etiquetas a través de fotoetiquetas
      this.belongsToMany(models.etiqueta, {
        through: 'fotoetiquetas',
        foreignKey: 'foto_id'
      });
    }
  }
  Foto.init({
    titulo: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    calificacion: DataTypes.FLOAT,
    ruta: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Foto',
  });
  return Foto;
};
