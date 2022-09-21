import { Op } from 'sequelize'
import { SeqMessage } from '../../models/SeqMessage'
import Message from '../../tsmodels/Message'
import IMessageAccessor from '../IMessageAccessor'

export default class SeqMessageAccessor implements IMessageAccessor{
    async getMessagesFromDate(lastDate: Date): Promise<Message[]> {
        const response = await SeqMessage.findAll({
            where: {
                date: {
                    [Op.gte]: lastDate
                }
            }
        })
        const result: Array<Message> = []
        for(const msg of response){
            result.push({
                id    : msg.id,
                author: msg.author,
                text  : msg.text,
                date  : msg.date
            })
        }
        return result
    }
    async saveMessage(author: string, text: string): Promise<void>{
        await SeqMessage.create({ author, text, date: new Date() })
    }
    async getMessagesUpToId(message_id: number|undefined, count: number): Promise<Array<Message>>{
        let upToDate = new Date()
        if(message_id){
            const message = await SeqMessage.findOne({
                where: {
                    id: message_id
                }
            })
            if(message){
                upToDate = message.date
            }
        }
        const response = await SeqMessage.findAll({
            where: {
                date: {
                    [Op.lte]: upToDate
                }
            },
            order: [['date', 'DESC']],
            limit: count
        })
        const result: Array<Message> = []
        for(const msg of response){
            result.push({
                id    : msg.id,
                author: msg.author,
                text  : msg.text,
                date  : msg.date
            })
        }
        return result
    }
}