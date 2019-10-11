module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Comments', 'postId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Posts',
        key: 'id'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Comments', 'postId');
  }
};
