import  Message from '../tsmodels/Message'
export default interface IMessageAccessor {
    saveMessage(author: string, text: string): Promise<void>
    getMessagesUpToId(message_id: number|undefined, count: number): Promise<Array<Message>>
    getMessagesFromDate(lastDate: Date): Promise<Array<Message>>
}