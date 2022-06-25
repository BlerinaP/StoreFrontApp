import {app} from "../../server";
import supertest from "supertest"
import jwt, {Secret} from "jsonwebtoken"


const bcrypt = process.env.BCRYPT_PASSWORD

const request = supertest(app)

describe("user", () => {
    let userId = 1
    let productId: number = 1;
    let token:string;
    let product;
    let name = "newProd"
    let price = 34

    beforeAll(async () => {
        const userObj = {
            firstname: "blerina",
            lastname: "pllana",
            password: "blerina"
        }
        const {body: uBody} = await request.post("/users").send(userObj)
        token = uBody

        const {user} = jwt.verify(token, bcrypt)
        userId = user.id

        product = {
            name: name,
            price: price,
        }
    })
    afterAll(async () => {
        await request.delete("/users").set('Authorization', "bearer " + token).send({
            id: userId
        })
    })
    
    it('should require auth for products route', (done) => {
        request.get("/products").then(res => {
            expect(res.status).toBe(200)
            done()
        })
        request.get(`/products/${productId}`).then(res => {
            expect(res.status).toBe(200)
            done() 
        })
        request.put(`/users/${productId}`).send({
            name: product.name,
            price: product.price
        }).then(res => {
            expect(res.status).toBe(401)
            done() 
        })
        request.delete('/products').send({
            id: productId
        }).then(res => {
            expect(res.status).toBe(401)
            done() 
        })
        
    })
    it('should create product', (done) => {
        request.post('/products').send(product).set('Authorization', "bearer " + token).then(res => {
            const body = res.body;
            const status = res.status;
            
            productId = body.id;
            expect(status).toBe(200)
            done() 
        })
    })
    it('should get product', (done) => {
        request.get(`/products/:id`).send({
            id: productId
        }).then(res => {
            expect(res.status).toBe(200)
            done() 
        })
    })
    it('should get products', (done) => {
        request.get(`/products`).then(res => {
            expect(res.status).toBe(200)
            done() 
        })
    })

    it('should delete product', (done) => {
        request.delete('/products').set('Authorization', "bearer " + token).send({
            id: productId
        }).then(res => {
            expect(res.status).toBe(200)
            done() 
        })
    })

})
