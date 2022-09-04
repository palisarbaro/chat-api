import { Request, Response, NextFunction } from 'express'

import { BadRequest } from '../errors'
import MessageService from '../services/MessageService'
import { responseOk } from '../utils'


export default class MessageController {
    messageService: MessageService

    constructor(messageService: MessageService){
        this.messageService =  messageService
    }

    async getLastMessages(req: Request, res: Response, next: NextFunction) {
        try{
            const count: number = req.body.count
            if(!Number.isInteger(count) || count <= 0){
                throw new BadRequest('count must be a positive integer')
            }
            const messages = await this.messageService.getLastMessages(count)
            responseOk(res, { messages })
        }
        catch(err){
            next(err)
        }
    }
    async sendMessage(req: Request, res: Response, next: NextFunction){
        try{
            const text: string = req.body.text
            const author: string = req.body.auth_data.username
            if(!text){
                throw new BadRequest('text must be provided')
            }
            await this.messageService.saveMessage(author, text)
            responseOk(res, undefined)
        }
        catch(err){
            next(err)
        }
    }
}
