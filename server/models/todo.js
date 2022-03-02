    import Sequelize from 'sequelize';
    import  {sequelize} from '../utils/db';


const TodoList = sequelize.define("todo",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // description: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // },
    // status: {
    //     type: Sequelize.BOOLEAN,
    //     allowNull: false
    // },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

export default TodoList;