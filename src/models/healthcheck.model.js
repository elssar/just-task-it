import { DataTypes, Model } from 'Sequelize';

class HealthCheck extends Model {};

function initialize (db) {
    HealthCheck.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        status: {
            type: DataTypes.STRING,
            length: 8,
            allowNull: false
        }
    }, {
        sequelize: db,
        modelName: 'healthcheck',
        tableName: 'healthcheck',
        createdAt: 'created_at',
        updatedAt: false
    });
}

export default HealthCheck;
export { initialize };

