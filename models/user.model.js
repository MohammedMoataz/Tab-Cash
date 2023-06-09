export default (sequelize, DataTypes) => {
    return sequelize.define("users", {
        id: {
            type: DataTypes.STRING(50),
            primaryKey: true
        },
        parent_id: {
            type: DataTypes.STRING(50)
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
        national_id: {
            type: DataTypes.STRING(14)
        },
        photo: {
            type: DataTypes.STRING(700)
        },
        access_token: {
            type: DataTypes.STRING(250)
        },
        is_child: {
            type: DataTypes.BOOLEAN
        },
        credit_card_num: {
            type: DataTypes.STRING(16)
        },
        credit_card_pass: {
            type: DataTypes.STRING(4)
        },
        credit_card_expiration_date: {
            type: DataTypes.DATE
        },
        restrictions: {
            type: DataTypes.STRING(200)
        },
        balance: {
            type: DataTypes.INTEGER
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