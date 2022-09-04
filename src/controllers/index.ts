import SeqMessageAccessor from '../accessors/sequelize/SeqMessageAccessor'

import MessageService from '../services/MessageService'

import MessageController from './MessageController'

const messageAccessor = new SeqMessageAccessor()

const messageService = new MessageService(messageAccessor)

export const messageController = new MessageController(messageService)