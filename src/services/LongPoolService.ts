import { Response }from 'express'
import { responseOk } from '../utils'
import MessageService from './MessageService'

export default class LongPoolService {
    messageService: MessageService
    responses: Array<[Date, Response]>
    constructor(messageService: MessageService){
        this.responses = []
        this.messageService = messageService
    }
    async sendResponses(){
        while(this.responses.length > 0){
            const [lastDate, response] = this.responses.pop()!
            responseOk(response, { messages: await this.messageService.getMessagesFromDate(lastDate) })
        }
    }
    async saveSubscribtion(lastDate: Date, response: Response){
        this.responses.push([lastDate, response])
    }

}
