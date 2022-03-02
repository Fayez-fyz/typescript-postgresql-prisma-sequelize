import express from "express";
import {
    deleteTodo,
    getTodo,
    getTodoById,
    postTodo,
    updateTodo,
} from "../controllers/post";
const router = express.Router();


router.post("/todos", postTodo);
router.get("/todos", getTodo);
router.get("/todos/:id", getTodoById);
router.put("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);


module.exports = router;
