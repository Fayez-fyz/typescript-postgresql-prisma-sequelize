import { Request, Response,NextFunction } from 'express';
import Post from '../models/todo';


export const getTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todos = await Post.findAll();
        res.json(todos);
    } catch (error) {
        next(error);
    }
};

export const getTodoById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todo = await Post.findByPk(req.params.id);
        res.json(todo);
    } catch (error) {
        next(error);
    }
};

export const postTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todo = await Post.create(req.body);
        res.json(todo);
    } catch (error) {
        next(error);
    }
}

export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todo = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json(todo);
    } catch (error) {
        next(error);
    }
}

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todo = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json(todo);
    } catch (error) {
        next(error);
    }
}
