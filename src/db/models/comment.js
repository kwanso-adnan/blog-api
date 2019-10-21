module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      body: DataTypes.STRING,
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Post, {
      foreignKeyConstraint: true,
      foreignKey: 'postId'
    });
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      foreignKeyConstraint: true
    });
  };
  return Comment;
};
