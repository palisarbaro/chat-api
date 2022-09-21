import IMessageAccessor from '../accessors/IMessageAccessor'
import Message from '../tsmodels/Message'
export default class MessageService {
    messageAccessor: IMessageAccessor

    constructor(messageAccessor: IMessageAccessor){
        this.messageAccessor = messageAccessor
    }
    async saveMessage(author: string, text: string){
        await this.messageAccessor.saveMessage(author, text)
    }
    async getMessagesUpToId(message_id: number|undefined, count: number): Promise<Array<Message>>{
        const messages = await this.messageAccessor.getMessagesUpToId(message_id, count)
        return messages
    }
    async getMessagesFromDate(lastDate: Date): Promise<Array<Message>>{
        const messages = await this.messageAccessor.getMessagesFromDate(lastDate)
        return messages
    }
}
