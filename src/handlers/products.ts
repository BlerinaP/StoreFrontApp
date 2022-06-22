import express, {Request, Response} from 'express'
import {Products, STOREFRONT_PRODUCTS} from "../models/products";
var jwt = require('jsonwebtoken');
import isAuth from "./IsAuth";

const store = new STOREFRONT_PRODUCTS();

const index = async (_req: Request, res:Response) => {
    try {
        const products = await store.index()
        res.json(products)
    }
    catch(err){
        res.status(404)
        res.json('Something went wrong')
    }
};

const create = async (req: Request, res:Response) => {
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
    try{
        const product = await store.show(req.body.id);
        res.json(product)
    } catch(err){
        res.status(404)
        res.json('Product with specific id not found')
    }
};

const delete_product = async(req: Request, res: Response) => {
    try{
        const deleted = await store.delete(req.body.id)
        res.json(deleted)
    }catch(err){
        res.status(404)
        res.json(err)
    }
};

const products_routes = (app: express.Application) => {
    app.get('/products', isAuth, index);
    app.post('/products', isAuth, create);
    app.get('/products/:id', isAuth, show);
    app.delete('/products', isAuth, delete_product);
};
export default products_routes