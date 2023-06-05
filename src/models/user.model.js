import { DataTypes, Model } from 'Sequelize';

class User extends Model {};

function initialize (db) {
    User.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            length: 128,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            length: 128,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        sequelize: db,
        modelName: 'user',
        tableName: 'user',
        createdAt: 'joined',
        updatedAt: 'updated_at'
    });
}

export default User;
export { initialize };

