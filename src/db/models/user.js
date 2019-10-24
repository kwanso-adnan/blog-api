import bcrypt from 'bcrypt';
import { CustomError } from '../../utils/error';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      password: {
        allowNull: false,
        type: DataTypes.VIRTUAL,
        async set(password) {
          const valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,30}$/.test(
            password
          );
          if (!valid) {
            throw new CustomError(400, 'Password not valid');
          }
          try {
            const hash = await bcrypt.hash(password, 12);
            this.setDataValue('passwordHash', hash);
          } catch (error) {
            throw new CustomError(500, 'Sorry, we\'re facing some issues.');
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
  User.prototype.authenticate = async function(password) {
    const hash = this.getDataValue('passwordHash');
    try {
      const authenticated = bcrypt.compare(password, hash);
      if (!authenticated) throw new CustomError(401, 'Unauthorized');
    } catch (error) {
      throw new Error(500, error.message);
    }
  };
  return User;
};
