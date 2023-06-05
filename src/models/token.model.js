import { DataTypes, Model } from 'Sequelize';

class Token extends Model {};

function initialize (db) {
    Token.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        user: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        public: {
            type: DataTypes.STRING,
            length: 8,
            allowNull: false
        },
        private: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize: db,
        modelName: 'token',
        tableName: 'token',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
}

export default Token;
export { initialize };

