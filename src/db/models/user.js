import bcrypt from 'bcrypt';
import CustomError from '../../utils/CustomError';
import errors from '../../utils/errors';

const { badRequest, serverError } = errors;

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
            throw new CustomError(badRequest('Password is invalid'));
          }
          this.setDataValue('password', password);
        }
      }
    },
    {
      hooks: {
        beforeValidate: function hashPassword(user, options) {
          console.log('Pssword is ', user.password);
          return bcrypt
            .hash(user.password, 12)
            .then(hash => {
              user.passwordHash = hash;
            })
            .catch(error => {
              throw CustomError(serverError(error.message));
            });
        }
      }
    }
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
  User.prototype.authenticate = async function checkPassword(password) {
    const hash = this.getDataValue('passwordHash');
    let authenticated = false;
    try {
      authenticated = await bcrypt.compare(password, hash);
    } catch (error) {
      throw new Error(serverError('Decryption error.'));
    }
    return authenticated;
  };
  return User;
};
