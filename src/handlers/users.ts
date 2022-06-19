import express, {Request, Response} from 'express'
import {User, STOREFRONT_USER} from "../models/users";
var jwt = require('jsonwebtoken');

const store = new STOREFRONT_USER();

const index = async (_req: Request, res:Response) => {
    const users = await store.index()
    res.json(users)
};

const create = async (req: Request, res:Response) => {
    try{
        const user: User = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        };
        const newUser = await store.create(user);
        let token = jwt.sign({ user: newUser }, process.env.BCRYPT_PASSWORD);
        res.json(token)
    } catch (err) {
        res.status(400);
        console.log(err);
        res.json(err)
    }
};

const show = async (req: Request, res:Response) => {
    const user = await store.show(req.body.id);
    res.json(user)
};

const delete_user = async(req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
};

const update = async (req:Request, res:Response) => {
    const user: User = {
        id: parseInt(req.params.id),
        firstname: req.body.firstname,
        password: req.body.password
    };
    try{
        const authorizationHeader = req.headers.authorization

        const token = authorizationHeader && authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.BCRYPT_PASSWORD)
        if(decoded.user.id !== user.id){
            throw new Error('User id does not match')
        }
    } catch (err) {
        res.status(401)
        res.json(err)
        return
    }

    try{
        const updated = await store.create(user)
        res.json(updated)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const authenticate = async (req:Request, res:Response) => {
    const user: User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    };
    try{
        const u = await store.authenticate(user.firstname, user.password);
        var token  = jwt.sign({user: u}, process.env.BCRYPT_PASSWORD);
        res.json(token)
    } catch (err){
        res.status(401);
        res.json({ err })
    }
};

const users_routes = (app: express.Application) => {
    app.get('/users', index);
    app.post('/users', create);
    app.get('/users/:id', show);
    app.delete('/users', delete_user)
    app.put('/users/:id', update)
};



export default users_routes