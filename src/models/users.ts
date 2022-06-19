import client from "../database";
import bcryptjs from "bcryptjs"
import dotenv from "dotenv";
dotenv.config();

const saltRounds = Number(String(process.env.SALT_ROUNDS ));
const pepper = process.env.BCRYPT_PASSWORD;

export type User = {
    id?: Number,
    firstname: string;
    lastname?: string;
    password: string;
}

export class STOREFRONT_USER {
    async index(): Promise<User[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch(err) {
           throw new Error(`Could not get users. Error: ${err}`)
        }
    }
    async create(u: User): Promise<User> {
        try {
            const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *'
            // @ts-ignore
            const conn = await client.connect()

            const hash = bcryptjs.hashSync(
                u.password + pepper,
               saltRounds
            );

            const result = await conn.query(sql, [u.firstname, u.lastname, hash])
            const user = result.rows[0]
            conn.release();
            return user
        } catch(err) {
            throw new Error(`unable create user (${u.firstname}): ${err}`)
        }
    }
    async show(id: string): Promise<User>{
        try{
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
    }
    async delete(id: string): Promise<User>{
        try{
            const sql = 'DELETE FROM users WHERE  id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            const user = result.rows[0]
            conn.release()
            return user
        } catch (e) {
            throw new Error(`Could not delete user ${id}. Error: ${e}`)
        }
    }
    async authenticate(username: string, password: string): Promise<User | null> {
        const conn = await client.connect()
        const sql = 'SELECT password FROM users WHERE username=($1)'

        const result = await conn.query(sql, [username])

        console.log(password+pepper)

        if(result.rows.length) {

            const user = result.rows[0]

            console.log(user)

            if (bcryptjs.compareSync(password+pepper, user.password_digest)) {
                return user
            }
        }

        return null
    }
}