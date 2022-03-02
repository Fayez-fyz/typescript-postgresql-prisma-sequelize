import express,{Router} from 'express';

const router:Router = express.Router();

import {
    deleteTodo,
    getTodo,
    getTodoById,
    postTodo,
    updateTodo,
} from "../controllers/post";


router.post("/todos", postTodo);
router.get("/todos", getTodo);
router.get("/todos/:id", getTodoById);
router.put("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);







module.exports = router;
