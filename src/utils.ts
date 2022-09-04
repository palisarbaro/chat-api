import { Response } from 'express'
import jwt from 'jsonwebtoken'
import { ACCESS_SECRET } from './config'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function responseOk(res: Response, obj: any){
    if(!obj){
        obj = {}
    }
    if(Array.isArray(obj)){
        throw new Error('Arrays are not allowed')
    }
    if(typeof obj !== 'object'){
        obj = { data: obj }
    }
    return res.json({ ...obj, status: 'ok' })
}

export function generateValidToken(timeout = '30s') {
    const payload = {
        username: 'test_user',
        rnd     : 123,
    }
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: timeout })
}
export function generateExpiredToken() {
    const payload = {
        username: 'test_user',
        rnd     : 123,
        exp     : 0,
    }
    return jwt.sign(payload, ACCESS_SECRET)
}