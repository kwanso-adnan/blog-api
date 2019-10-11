module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      body: DataTypes.STRING,
      postId: DataTypes.INTEGER
    },
    {}
  );
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Post);
  };
  return Comment;
};
