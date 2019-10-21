'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
    commentId: DataTypes.INTEGER,
    responseId: DataTypes.INTEGER
  }, {});
  Reply.associate = function(models) {
    // associations can be defined here
  };
  return Reply;
};