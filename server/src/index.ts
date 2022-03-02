import express,{Application,Request,Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { sequelize } from './utils/db';
const postRoutes = require('./routes/post');


const app:Application = express();
app.use(cors({
    origin: '*',
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
sequelize.sync();

app.use('/api',postRoutes);




const port : number = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);
