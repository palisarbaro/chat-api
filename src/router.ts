import { Router } from 'express'
import { messageController } from './controllers'

const router = Router()

router.post('/getLastMessages', messageController.getLastMessages.bind(messageController))
router.post('/sendMessage', messageController.sendMessage.bind(messageController))
router.post('/subscribe', messageController.subscribe.bind(messageController))


export default router