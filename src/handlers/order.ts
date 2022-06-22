import express, {Request, Response} from 'express'
import {Orders, STOREFRONT_ORDERS} from "../models/order";
var jwt = require('jsonwebtoken');
import isAuth from "./IsAuth";

const store = new STOREFRONT_ORDERS();

const index = async (_req: Request, res:Response) => {
    try{
        const orders = await store.index()
        res.json(orders)
    } catch(err){
        res.status(404)
        res.json('Something went wrong')
    }

};

const create = async (req: Request, res:Response) => {
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
    try{
        const order = await store.show(req.body.id);
        res.json(order)
    } catch(err){
        res.status(404)
        res.json('Order with specific id not found')
    }

};

const showByUser = async (req: Request, res:Response) => {
    try{
        const order = await store.showByUser(req.body.user_id);
        res.json(order)
    }catch(err){
        res.status(404)
        res.json('Order with specific id not found')
    }

};

const delete_order = async(req: Request, res: Response) => {
    try{
        const deleted = await store.delete(req.body.id);
        res.json(deleted)
    }catch(err){
        res.status(404)
        res.json(err)
    }

};

const addProductOrder = async(req: Request, res: Response) => {
    const orderId: string = req.body.id;
    const productId: string = req.body.productId;
    const quantity: number = parseInt(req.body.quantity);
    try{
        const addedProduct = await store.addProduct(quantity, orderId, productId)
        res.json(addedProduct)
    } catch (e) {
        res.status(400);
        res.json(e)
    }
};

const order_routes = (app: express.Application) => {
    app.get('/orders', isAuth, index);
    app.post('/orders', isAuth, create);
    app.get('/orders/:id', isAuth, show);
    app.get('/orders/user/user_id', isAuth, showByUser);
    app.delete('/orders', isAuth, delete_order);
    app.post('/orders/:id/products', isAuth, addProductOrder)
};
export default order_routes