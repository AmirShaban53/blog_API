import Sequelize from 'sequelize';

// import Post from './Post';
// import User from './User';
// import Comment from './comment';

import dotenv from 'dotenv';
dotenv.config();


const devConfig = `postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`


const config = {
    user: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
}

const pool = {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 1000
}
// const sequelize = new Sequelize(devConfig, {pool: pool});
// sequelize.authenticate();
// const pool = new pg.Pool(config);
let sequelize;
const dbConnect = async () => {
    try {
        sequelize = new Sequelize(devConfig, {pool: pool});
        await sequelize.authenticate();
        console.log('connected to the database');
        sequelize.sync({});
        
    } catch (error) {
        console.log(error.message);
    
    }

}
dbConnect();

export default sequelize;