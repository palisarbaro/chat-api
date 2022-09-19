import  Message from '../tsmodels/Message'
export default interface IMessageAccessor {
    saveMessage(author: string, text: string): Promise<void>
    getLastMessages(count: number): Promise<Array<Message>>
    getMessagesFromDate(lastDate: Date): Promise<Array<Message>>
}