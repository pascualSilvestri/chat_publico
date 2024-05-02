import db from '../db/db';
import {DataTypes, Model} from 'sequelize';


class User extends Model {
    public id!: number;
    public usuario!: string;
    public nombre!: string;
    public password!: string;
}

User.init(
    
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario:
    {
        type: DataTypes.STRING,
    },
    nombre:{
        type: DataTypes.STRING,
    },
    password:{
        type: DataTypes.STRING,
    }


},
{
    sequelize:db,
    tableName: "user",
    timestamps: true
}
);



export default User;
