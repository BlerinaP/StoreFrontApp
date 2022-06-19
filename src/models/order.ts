import client from "../database";
import dotenv from "dotenv";
dotenv.config();

export type Orders = {
    id?: Number,
    user_id: number;
    status: string;
}
export class STOREFRONT_ORDERS{
    async index(): Promise<Orders[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders'
            const result = await conn.query(sql);
            conn.release()
            return result.rows
        } catch(err) {
            throw new Error(`Could not get Orders. Error: ${err}`)
        }
    }
    async create(o: Orders): Promise<Orders> {
        try {
            const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *'
            // @ts-ignore
            const conn = await client.connect();
            const result = await conn.query(sql, [o.user_id, o.status]);
            const order = result.rows[0];
            conn.release();
            return order
        } catch(err) {
            throw new Error(`unable create order (${o.user_id}): ${err}`)
        }
    }
    async show(id: string): Promise<Orders> {
        try{
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
    }
    async showByUser(user_id: string): Promise<Orders[]> {

        try{
            const sql = 'SELECT * FROM orders WHERE user_id=($1)';
            const conn = await client.connect();
            const result = await conn.query(sql, [user_id]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not find order ${user_id}. Error: ${err}`)
        }
    }
    async delete(id: string): Promise<Orders>{
        try{
            const sql = 'DELETE FROM orders WHERE  id=($1)'
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            const order = result.rows[0];
            conn.release();
            return order
        } catch (e) {
            throw new Error(`Could not delete order ${id}. Error: ${e}`)
        }
    }
    async addProduct(quantity: number, orderId: string, productId: string): Promise<Orders> {
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            //@ts-ignore
            const conn = await client.connect()

            const result = await conn
                .query(sql, [quantity, orderId, productId])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
    }
}