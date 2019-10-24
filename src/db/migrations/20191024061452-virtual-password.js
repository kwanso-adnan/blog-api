module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'password'),
      queryInterface.addColumn('Users', 'passwordHash', {
        type: Sequelize.STRING,
        notNull: true
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'passwordHash'),
      queryInterface.addColumn('Users', 'password', {
        type: Sequelize.STRING,
        notNull: true
      })
    ]);
  }
};
