module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Comments', 'name');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Comments', 'name', {
      type: Sequelize.STRING
    });
  }
};
