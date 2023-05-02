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
        dob: {
            type: DataTypes.DATE
        },
        address: {
            type: DataTypes.STRING(200)
        },
        gender: {
            type: DataTypes.BOOLEAN
        },
        phone: {
            type: DataTypes.STRING(11)
        },
        access_token: {
            type: DataTypes.STRING(250)
        },
        _created_at: {
            type: DataTypes.DATE
        },
        _updated_at: {
            type: DataTypes.DATE
        },
        _deleted: {
            type: DataTypes.BOOLEAN
        }
    }, {
        defaultScope: {
            attributes: {
                exclude: ['password', "_deleted"]
            }
        }
    })
}
