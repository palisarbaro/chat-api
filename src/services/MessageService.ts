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
    async getLastMessages(count: number): Promise<Array<Message>>{
        const messages = await this.messageAccessor.getLastMessages(count)
        return messages
    }
}
