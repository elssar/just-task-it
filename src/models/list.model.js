import { DataTypes, Model } from 'Sequelize';

Class List extends Model {};

function initialize (db) {
    List.inti({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        user: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            length: 32,
            allowNull: false
        }
    }, {
        sequelize: db,
        modelName: 'list',
        tableName: 'list',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
}

export default List;
export { initialize };

