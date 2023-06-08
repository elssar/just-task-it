import { DataTypes, Model } from 'Sequelize';

class Todo extends Model {
    toJSON() {
        let { user, done_at, ...data } = this.get();

        if (done_at === null) {
            data.status = 'pending'
        }
        else {
            data.status = 'done';
            data.done_at = done_at;
        }

        return data;
    }
};

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
            allowNull: true 
        },
        due_by: {
            type: DataTypes.DATE,
            allowNull: false
        },
        done_at: {
            type: DataTypes.DATE,
            allow_null: true
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

