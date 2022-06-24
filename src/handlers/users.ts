import express, {Request, Response} from 'express'
import {User, STOREFRONT_USER} from "../models/users";
var jwt = require('jsonwebtoken');
import isAuth from "./IsAuth";

const store = new STOREFRONT_USER();

const index = async (_req: Request, res:Response) => {
    try{
        const users = await store.index()
        res.json(users)
    }catch(err){
        res.status(404)
        res.json('Something went wrong')
    }

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
        res.json(err)
    }
};

const show = async (req: Request, res:Response) => {
    try{
        const user = await store.show(req.body.id);
        res.json(user)
    } catch(err){
        res.status(404)
        res.json('User with specific id not found')
    }
};

const delete_user = async(req: Request, res: Response) => {
    try{
        const deleted = await store.delete(req.body.id)
        res.json(deleted)
    }catch(err){
        res.status(404)
        res.json('User with specific id not found')
    }

};

const update = async (req:Request, res:Response) => {
    const user: User = {
        id: parseInt(req.params.id),
        firstname: req.body.firstname,
        password: req.body.password
    };

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
    app.get('/users', isAuth, index);
    app.post('/users', create);
    app.get('/users/:id', isAuth, show);
    app.delete('/users', isAuth, delete_user)
    app.put('/users/:id', isAuth, update)
};



export default users_routes