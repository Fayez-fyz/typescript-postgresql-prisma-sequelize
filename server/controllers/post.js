import Post from '../models/todo';


export const postTodo = async (req,res) => {
    const { title } = req.body;
  try {
    const todo = await Post.create({
      title,
    });
    console.log(todo);
    res.status(201).json({message: 'Todo created successfully', todo});
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
      
  }
};

export const getTodo = async (req,res) => {
    try {
        const todos = await Post.findAll();
        res.status(200).send(todos);
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
};

export const getTodoById = async (req,res) => {
    try {
        const todo = await Post.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).send(todo);
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
}

export const updateTodo = async (req,res) => {
    const { title } = req.body;
    try {
        const todo = await Post.update({
            title
        },{
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({message: 'Todo updated successfully', todo});
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
}

export const deleteTodo = async (req,res) => {
    try {
        const todo = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        console.log(todo);
        res.status(200).json({message: 'Todo deleted successfully'});
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
}


