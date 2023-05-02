export default (sequelize, DataTypes) => {
    return sequelize.define("users", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        parent_id: {
            type: DataTypes.INTEGER
        },
        first_name: {
            type: DataTypes.STRING(100)
        },
        last_name: {
            type: DataTypes.STRING(100)
        },
        username: {
            type: DataTypes.STRING(45)
        },
        email: {
            type: DataTypes.STRING(200)
        },
        password: {
            type: DataTypes.STRING(200)
        },
        age: {
            type: DataTypes.INTEGER
        },
        address: {
            type: DataTypes.STRING(200)
        },
        gender: {
            type: DataTypes.BOOLEAN
        },
        phone: {
            type: DataTypes.STRING(11)
        }
    }, {
        defaultScope: {
            attributes: {
                exclude: ['password']
            }
        }
    })
}
