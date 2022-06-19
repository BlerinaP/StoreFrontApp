import express, {Request, Response} from 'express'
import {Products, STOREFRONT_PRODUCTS} from "../models/products";
var jwt = require('jsonwebtoken');

const store = new STOREFRONT_PRODUCTS();

const index = async (_req: Request, res:Response) => {
    const products = await store.index()
    res.json(products)
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
        const product: Products = {
            name: req.body.name,
            price: req.body.price
        };
        const newProd = await store.create(product);
        res.json(newProd)
    } catch (err) {
        res.status(400);
        res.json(err)
    }
};
const show = async (req: Request, res:Response) => {
    const product = await store.show(req.body.id);
    res.json(product)
};

const delete_product = async(req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
};

const products_routes = (app: express.Application) => {
    app.get('/products', index);
    app.post('/products', create);
    app.get('/products/:id', show);
    app.delete('/products', delete_product);
};
export default products_routes