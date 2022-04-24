import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { cloudinaryConfig } from './config/cloudinaryConfig.js';
import posts from './routes/posts.js';
import auth from './routes/auth.js';
import logger from './middleware/logger.js';

const PORT = process.env.PORT || 5000;
const app = express();
const swaggerDocs = YAML.load('./src/config/swagger.yml');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(cors());
app.use('*', cloudinaryConfig);
app.get('/', (req, res)=> {res.json('welcome to the blog API.')})
app.use('/uploads', express.static('uploads'))

app.use('/posts', posts);
app.use('/auth', auth);
app.use((req, res)=>{res.status(404).json({message: "route not located"});});

app.listen(PORT, ()=> {logger.info(`blog API now live at: http://localhost:${PORT}`)});

export default app;