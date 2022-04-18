import sequelize from ".";
import Sequelize from "sequelize";

import Post from "./post";

const Comment = sequelize.define('comment',{
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
        allowNull: false
    },
    comment:{
        type: Sequelize.STRING,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

Post.hasMany(Comment, {onDelete: 'cascade'});
Comment.belongsTo(Post);

// User.hasMany(Comment);
// Comment.belongsTo(User);
// Comment.belongsTo(User);

export default Comment;