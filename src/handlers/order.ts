import express, {Request, Response} from 'express'
import {Orders, STOREFRONT_ORDERS} from "../models/order";
var jwt = require('jsonwebtoken');

const store = new STOREFRONT_ORDERS();

const index = async (_req: Request, res:Response) => {
    const orders = await store.index()
    res.json(orders)
};

const create = async (req: Request, res:Response) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader && authorizationHeader.split(' ')[1];
        jwt.verify(token, process.env.BCRYPT_PASSWORD)
    } catch(err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return
    }
    try{
        const order: Orders = {
            user_id: req.body.user_id,
            status: req.body.status
        };
        const newOrder = await store.create(order);
        res.json(newOrder)
    } catch (err) {
        res.status(400);
        res.json(err)
    }
};
const show = async (req: Request, res:Response) => {
    const order = await store.show(req.body.id);
    res.json(order)
};

const showByUser = async (req: Request, res:Response) => {
    const order = await store.showByUser(req.body.user_id);
    res.json(order)
};

const delete_order = async(req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id);
    res.json(deleted)
};

const addProductOrder = async(req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader && authorizationHeader.split(' ')[1];
        jwt.verify(token, process.env.BCRYPT_PASSWORD)
    } catch(err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return
    }
    const orderId: string = req.body.id;
    const productId: string = req.body.productId;
    const quantity: number = parseInt(req.body.quantity);
    try{
        console.log(quantity, orderId, productId)
        const addedProduct = await store.addProduct(quantity, orderId, productId)
        res.json(addedProduct)
    } catch (e) {
        res.status(400);
        res.json(e)
    }
};

const order_routes = (app: express.Application) => {
    app.get('/orders', index);
    app.post('/orders', create);
    app.get('/orders/:id', show);
    app.get('/orders/user/user_id', showByUser);
    app.delete('/orders', delete_order);
    app.post('/orders/:id/products', addProductOrder)
};
export default order_routes