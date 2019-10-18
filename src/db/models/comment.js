module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      body: DataTypes.STRING,
      postId: {
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
  };
  return Comment;
};
