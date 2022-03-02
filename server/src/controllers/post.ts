import { PrismaClient } from '@prisma/client';
import { Request, Response,NextFunction } from 'express';

const {todo} = new PrismaClient();



export const postTodo = async (req: Request, res: Response, next: NextFunction) => {
    const{title}=req.body;
 try {
     const data:any = await todo.create({
            data:{
                title,
            }
        })
        res.status(200).json({
            message:'Todo created successfully',
            data
        })
 } catch (error) {
    res.status(400).send(error);
    console.log(error);
 }             
}

export const getTodo = async (req: Request, res: Response, next: NextFunction) => {
try {
    const data:any = await todo.findMany();
    res.status(200).json({
        // message:'Todo fetched successfully',
        data
    })
} catch (error) {
    res.status(400).send(error);
        console.log(error);
}
}

export const getTodoById = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    try {
        const data:any = await todo.findUnique({
            where:{
                id:parseInt(id) 
            }
        })
        res.status(200).json({
            message:'Todo fetched successfully',
            data
        })
    } catch (error) {
        res.status(400).send(error);
            console.log(error);
    }
}

export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    const {title} = req.body;
    const {id} = req.params;
try {
    const data:any = await todo.update({
        where:{
            id:parseInt(id)
          
        },
        data:{
            title
        }
    })
    res.status(200).json({
        message:'Todo updated successfully',
        data
    })
} catch (error) {
    res.status(400).send(error); 
        console.log(error);
}
}

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
try {
    const data:any = await todo.delete({
        where:{
            id:parseInt(id)
        }
    })
    res.status(200).json({
        message:'Todo deleted successfully',
        data
    })
} catch (error) {
    res.status(400).send(error);
        console.log(error);
}
}