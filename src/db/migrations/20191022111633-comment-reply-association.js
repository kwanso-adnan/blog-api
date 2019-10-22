module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Comments', 'parentId', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Comment', 'parentId');
  }
};
