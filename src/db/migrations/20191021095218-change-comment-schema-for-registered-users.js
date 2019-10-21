module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Comments', 'email'),
      queryInterface.addColumn('Comments', 'userId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Comments', 'userId'),
      queryInterface.addColumn('Comments', 'email', {
        type: Sequelize.STRING
      })
    ]);
  }
};
