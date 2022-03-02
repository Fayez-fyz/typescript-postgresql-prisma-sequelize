import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';
import { pool } from './db';

pool.connect().then(() => {
    console.log('Connected to the database');
}).catch(err => {
    console.log('Error connecting to the database', err);
});


const app = express();
const port = process.env.PORT || 5000;

app.use(cors(
    {origin: '*'}
));
app.use(express.json());

//create a todo

app.post("/todos", async (req, res) => {
    try {
      const { description } = req.body;
      const newTodo = await pool.query(
        "INSERT INTO todo (description) VALUES($1) RETURNING *",
        [description]
      );
  
      res.json(newTodo);
    } catch (err) {
      console.error(err.message);
    }
  });

//GET A TODO
app.get('/todos',async (req,res) => {
  try {
        const getTodos = await pool.query('SELECT * FROM todo');
        res.json(getTodos.rows);

  } catch (error) {
        console.error(error.message);
      
  }

}
)
//GET A TODO BY ID
app.get('/todos/:id',async (req,res) => {
    try {
            const { id } = req.params;
            const getTodo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
            res.json(getTodo.rows);
    } catch (error) {
            console.error(error.message);
    }
})

//UPDATE A TODO
app.put('/todos/:id',async (req,res) => {
    try {
            const { id } = req.params;
            const { description } = req.body;
            const updateTodo =  await pool.query(
                "UPDATE todo SET description = $1 WHERE todo_id = $2",
                [description, id]
              );
              res.json(updateTodo)
    } catch (error) {
            console.error(error.message);
    }
})

//DELETE A TODO
app.delete('/todos/:id',async (req,res) => {
    try {
            const { id } = req.params;
            const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
            res.json("Todo was deleted!");
    } catch (error) {
            console.error(error.message);
    }
})










app.listen(port, () => console.log(`Listening on port ${port}`));