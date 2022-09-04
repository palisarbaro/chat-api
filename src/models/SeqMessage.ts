import { Sequelize, DataTypes, Model } from 'sequelize'
export class SeqMessage extends Model{
    declare id: number
    declare author: string
    declare text: string
    declare date: Date
}
export default function(sequelize: Sequelize){
    return SeqMessage.init(
        {
            id: {
                type         : DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey   : true
            },
            author: {
                type     : DataTypes.STRING,
                allowNull: false,
            },
            text: {
                type     : DataTypes.STRING,
                allowNull: false,
            },
            date: {
                type     : DataTypes.DATE,
                allowNull: false
            }
        },
        { timestamps: false, sequelize, modelName: 'Message' }
    )
}
