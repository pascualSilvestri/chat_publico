import db from '../db/db';
import {DataTypes, Model} from 'sequelize';
import User from './User.model';


class Message extends Model {
    public id!: number;
    public message!: string;
    public userId!: number;
    public user?: User;
}

Message.init(
    
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    message:
    {type: DataTypes.STRING,
    }

},
{
    sequelize:db,
    tableName: "message",
    timestamps: true
}
);



export default Message;
