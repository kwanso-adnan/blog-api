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
        type: DataTypes.STRING
      }
    },
    {}
  );
  User.associate = function(models) {
    User.hasMany(models.Post, {
      foreignKeyConstraint: true,
      foreignKey: 'userId'
    });
  };
  return User;
};

// Check the syntax to make the columns unique
// Password Strength validation 8, uppercase, lowecase special characters.
// DataType of password field virtual and actual field
// Both are defined in the Model.
