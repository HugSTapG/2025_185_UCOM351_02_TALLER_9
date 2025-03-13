// @ts-nocheck
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let [fotos, fotos_metadata] = await queryInterface.sequelize.query('SELECT id FROM fotos')
    let [etiquetas, etiquetas_metadata] = await queryInterface.sequelize.query('SELECT id FROM etiquetas')

    let etiquetaIds = etiquetas.map(e => e.id);

    function getRandomEtiquetas() {
      let shuffled = etiquetaIds.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    }
    
    let fotoetiquetas = [];

    for (let foto of fotos) {
      let selectedEtiquetas = getRandomEtiquetas();
      for (let etiquetaId of selectedEtiquetas) {
        fotoetiquetas.push({
          foto_id: foto.id,
          etiqueta_id: etiquetaId,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    await queryInterface.bulkInsert('fotoetiquetas', fotoetiquetas, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fotoetiquetas', null, {});
  }
};
