process.env.NODE_ENV = 'test'


import { expect, use, request } from 'chai'
import chaiHttp from 'chai-http'
import { app } from '../index'
import sequelize  from '../models/dbInstance'
import { generateExpiredToken, generateValidToken } from '../utils'
use(chaiHttp)

describe('API tests', () => {
    beforeEach(async function () {
        await sequelize.sync({ force: true })
    })

    it('Cannot access without token', async function()  {
        const res = await request(app)
            .post('/api/getMessagesUpToId')
            .send({ count: 3 })
        expect(res).have.status(401)
        expect(res.body.status).to.equal('error')

    })

    it('Cannot access with expired token', async function()  {
        const res = await request(app)
            .post('/api/getMessagesUpToId').set('Authorization', `Barier ${generateExpiredToken()}`)
            .send({ count: 3 })
        expect(res).have.status(401)
        expect(res.body.status).to.equal('error')

    })

    it('Can access with valid token', async function()  {
        const res = await request(app)
            .post('/api/getMessagesUpToId').set('Authorization', `Barier ${generateValidToken()}`)
            .send({ count: 3 })
        expect(res).have.status(200)
        expect(res.body.status).to.equal('ok')
        expect(res.body).have.property('messages')

    })

})