import Sequelize from 'sequelize';
import logger from '../middleware/logger';
import dotenv from 'dotenv';
dotenv.config();


const devConfig = `postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DEV_DATABASE}`
const testConfig = `postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_TEST_DATABASE}`


const config = process.env.DATABASE_URL

const pool = {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 1000
}
let sequelize;
const dbConnect = async () => {
    try {
        if (process.env.NODE_ENV === 'test') {
            sequelize = new Sequelize(testConfig, {pool: pool, logging: false});
            logger.info('connected to test database');
        }
        if(process.env.NODE_ENV === 'production'){
            sequelize = new Sequelize(config, {pool: pool});
            logger.info('connected to production database');
        }
        else{
            sequelize = new Sequelize(devConfig, {pool: pool});
            logger.info('connected to dev database');
        }
        await sequelize.authenticate();
        sequelize.sync({});
        
    } catch (error) {
        console.log(error.message);
    
    }

}
dbConnect();

export default sequelize;