import jwt from "jsonwebtoken"
import {User} from "../models/users";
import express, {Request, Response, NextFunction} from 'express'


function IsAuth(req:Request, res:Response, next:NextFunction): void | boolean {
    if(!req.headers.authorization){
        res.status(401)
        res.json("Invalid Token")
        return  false
    }
    try{
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader && authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.BCRYPT_PASSWORD)
        next()
    } catch(err){
        res.status(401)
        res.json("Invalid Token")
        return  false
    }
}
export default IsAuth