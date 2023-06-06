import { DataTypes, Model } from 'Sequelize';

class Todo extends Model {};

function initialize (db) {
    Todo.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        user: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        list: {
            type: DataTypes.BIGINT,
            allowNull; false
        },
        due_by: {
            type: DataTypes.DATE,
            allowNull: false
        },
        done_at: {
            type: DataTypes.DATE
        },
        title: {
            type: DataTypes.STRING,
            length: 64,
            allowNull: false
        }
    }, {
        sequelize: db,
        modelName: 'todo',
        tableName: 'todo',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
}

export default Todo;
export { initialize };

