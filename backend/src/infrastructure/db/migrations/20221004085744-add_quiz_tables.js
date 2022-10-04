"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable("quiz", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      author_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });

    await queryInterface.createTable("question", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      quiz_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "quiz",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });

    await queryInterface.createTable("option", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      question_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "question",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_answer: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable("option");
    await queryInterface.dropTable("question");
    await queryInterface.dropTable("quiz");
  },
};
