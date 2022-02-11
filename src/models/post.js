import sequelize from ".";
import Sequelize from "sequelize";


const Post = sequelize.define('post',{
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
        allowNull: false
    },
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    discription:{
        type: Sequelize.STRING
    },
    content:{
        type: Sequelize.STRING,
        allowNull: false
    },
    aurthor: {type: Sequelize.STRING,
        allowNull: false}
})

// // Post.hasMany(Comment);

export default Post;