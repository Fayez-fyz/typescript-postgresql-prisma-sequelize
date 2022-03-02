import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { sequelize } from './utils/db';

const postRoutes = require('./routes/post');


const port = process.env.PORT || 5000;
const app = express();
app.use(cors({
    origin: '*',
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DB CONNECTIONS
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
sequelize.sync();


app.use('/api',postRoutes);

// //ROUTES
// app.post('/todos',async (req,res) => {
//     const { title } = req.body;
//   try {
//     const todo = await TodoList.create({
//       title,
//     });
//     console.log(todo);
//     res.status(201).json({message: 'Todo created successfully', todo});
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//     console.log(error);
      
//   }
// });
// app.get('/todos', async (req,res) => {
//     try {
//         const todos = await TodoList.findAll();
//         res.status(200).send(todos);
//     } catch (error) {
//         res.status(400).send(error);
//         console.log(error);
//     }
// });
// app.get('/todos/:id', async (req,res) => {
//     try {
//         const todo = await TodoList.findOne({
//             where: {
//                 id: req.params.id
//             }
//         });
//         res.status(200).send(todo);
//     } catch (error) {
//         res.status(400).send(error);
//         console.log(error);
//     }
// });
// app.put('/todos/:id', async (req,res) => {
//     const { title } = req.body;
//     try {
//         const todo = await TodoList.update({
//             title
//         },{
//             where: {
//                 id: req.params.id
//             }
//         });
//         res.status(200).send(todo);
//     } catch (error) {
//         res.status(400).send(error);
//         console.log(error);
//     }
// });
// app.delete('/todos/:id', async (req,res) => {
//     try {
//         const todo = await TodoList.destroy({
//             where: {
//                 id: req.params.id
//             }
//         });
//         console.log(todo);
//         res.status(200).json({message: 'Todo deleted successfully'});
//     } catch (error) {
//         res.status(400).send(error);
//         console.log(error);
//     }
// });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});