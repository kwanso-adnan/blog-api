module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Users', 'password', {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        is: {
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
          msg:
            'The password must contain atleast 8 characters including at least 1 uppercase, 1 lowercase and one digit.'
        }
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Users', 'password', {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        is: {
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
          msg:
            'The password must contain atleast 8 characters including at least 1 uppercase, 1 lowercase and one digit.'
        }
      }
    });
  }
};
