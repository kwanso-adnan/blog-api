module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
          msg:
            'The password must contain atleast 8 characters including at least 1 uppercase, 1 lowercase and one digit.'
        }
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
