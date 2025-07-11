'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const fotos = [];

    for (let i = 0; i < 10; i++) {
      fotos.push({
        titulo: 'Foto ' + i,
        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        calificacion: parseFloat((Math.random() * 10).toFixed(2)),
        ruta: 'public/fotos/foto' + i + '.png',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('fotos', fotos, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fotos', null, {});
  }
};