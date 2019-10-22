module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      title: DataTypes.STRING,
      body: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  Post.associate = function(models) {
    Post.belongsTo(models.User, {
      foreignKeyConstraint: true,
      foreignKey: 'userId'
    });
    Post.hasMany(models.Comment, {
      as: 'comments',
      foreignKeyConstraint: true,
      foreignKey: 'postId'
    });
  };
  return Post;
};

// Change naming conventions by writing migrations
