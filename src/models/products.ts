import client from "../database";
import dotenv from "dotenv";
dotenv.config();

export type Products = {
    id?: Number,
    name: string;
    price: number;
}
export class STOREFRONT_PRODUCTS{
    async index(): Promise<Products[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql);
            conn.release()
            return result.rows
        } catch(err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
    }
    async create(p: Products): Promise<Products> {
        try {
            const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *'
            // @ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql, [p.name, p.price])
            const product = result.rows[0]
            conn.release();
            return product
        } catch(err) {
            throw new Error(`unable create product (${p.name}): ${err}`)
        }
    }
    async show(id: string): Promise<Products> {
        try{
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }
    async delete(id: string): Promise<Products>{
        try{
            const sql = 'DELETE FROM products WHERE  id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            const product = result.rows[0]
            conn.release()
            return product
        } catch (e) {
            throw new Error(`Could not delete product ${id}. Error: ${e}`)
        }
    }
}