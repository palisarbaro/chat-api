import SeqMessageAccessor from '../accessors/sequelize/SeqMessageAccessor'
import LongPoolService from '../services/LongPoolService'

import MessageService from '../services/MessageService'

import MessageController from './MessageController'

const messageAccessor = new SeqMessageAccessor()

const messageService = new MessageService(messageAccessor)
const longPoolService = new LongPoolService(messageService)

export const messageController = new MessageController(messageService, longPoolService)