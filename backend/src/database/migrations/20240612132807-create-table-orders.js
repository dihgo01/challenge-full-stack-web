'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('orders', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      code_order: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      patient_id: {
        type: Sequelize.UUID,
          references: { model: 'patients', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true,
      },
      doctor_id: {
        type: Sequelize.UUID,
          references: { model: 'doctors', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true,
      },
      subtotal_price: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.00,
        allowNull: false, 
      },
      total_price: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.00,
        allowNull: false, 
      },
      discount_value: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.00,
        allowNull: false, 
      },
      type_discount:{
        type: Sequelize.ENUM('Porcentagem', 'Valor'),
        allowNull: true,
      },
      send_kit: {
        type: Sequelize.ENUM('Sim', 'Não'),
        allowNull: false,
      }, 	
      url_csv: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status_order: {
        type: Sequelize.ENUM('Pendente', 'Em análise', 'Em transporte', 'Concluído', 'Cancelado'),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('orders');
  }
};
