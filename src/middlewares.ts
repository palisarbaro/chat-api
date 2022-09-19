import { Request, Response, NextFunction } from 'express'

import { Unauthorized } from './errors'
import jwt from 'jsonwebtoken'
import { ACCESS_SECRET } from './config'


export function authCheck(req: Request, res: Response, next: NextFunction) {
    try{
        const auth_header = req.headers.authorization || ''
        const token = auth_header.split(' ')[1] || ''
        //console.log(token, req.originalUrl)
        const payload = jwt.verify(token, ACCESS_SECRET)
        req.body.auth_data = payload

    }
    catch(e){
        next(new Unauthorized('invalid token'))
    }
    next()
}
