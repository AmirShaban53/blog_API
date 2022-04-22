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
    description:{
        type: Sequelize.STRING
    },
    image_URL:{
        type: Sequelize.STRING,
        allowNull: false
    },
    image_ID:{
        type: Sequelize.STRING,
        allowNull: false
    },
    content:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    author: {type: Sequelize.STRING,
        allowNull: false}
})


export default Post;