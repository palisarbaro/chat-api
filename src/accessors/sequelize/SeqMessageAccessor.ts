import { SeqMessage } from '../../models/SeqMessage'
import Message from '../../tsmodels/Message'
import IMessageAccessor from '../IMessageAccessor'

export default class SeqTokenAccessor implements IMessageAccessor{
    async saveMessage(author: string, text: string): Promise<void>{
        SeqMessage.create({ author, text, date: new Date() })
    }
    async getLastMessages(count: number): Promise<Array<Message>>{
        const response = await SeqMessage.findAll({
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