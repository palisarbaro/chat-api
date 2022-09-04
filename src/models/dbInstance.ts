import { Sequelize } from 'sequelize'
import fs from 'fs'

import  MessageInit from './SeqMessage'
import { DB_USER, DB_NAME, DB_PASSWORD, DB_URL } from '../config'



const logStream = fs.createWriteStream('./sql.log', { 'flags': 'a' })
const options = { logging: (msg: string) => logStream.write(msg) }
let sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_URL}/${DB_NAME}`, options)
if(process.env.NODE_ENV === 'test'){
    sequelize = new Sequelize('sqlite::memory:', options)
}
const models_init = [MessageInit]

for(const model_init of models_init){
    model_init(sequelize)
}
export default sequelize