module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          is: {
            args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
            msg:
              'The password must contain atleast 8 characters including at least 1 uppercase, 1 lowercase and one digit.'
          }
        }
      }
    },
    {}
  );
  User.associate = function(models) {
    User.hasMany(models.Post, {
      foreignKeyConstraint: true,
      foreignKey: 'userId'
    });
    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      foreignKeyConstraint: true
    });
  };
  return User;
};

// Check the syntax to make the columns unique
// Password Strength validation 8, uppercase, lowecase special characters.
// DataType of password field virtual and actual field
// Both are defined in the Model.
