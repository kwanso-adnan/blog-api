module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
      default: ''
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'password', {
      type: Sequelize.STRING
    });
  }
};
