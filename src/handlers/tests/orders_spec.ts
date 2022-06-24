import {app} from "../../server";
import supertest from "supertest"
import jwt, {Secret} from "jsonwebtoken"

const bcrypt = process.env.BCRYPT_PASSWORD

const request = supertest(app)

describe("order", () => {
    let userId = 1
    let orderId:number = 1
    let token:string;
    let order;
    let status:string  = 'new'

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
       

        order = {
            user_id: userId,
            status: status
        }

    })
    afterAll(async () => {
        await request.delete("/users").set('Authorization', "bearer " + token).send({
            id: userId
        })
    })
    it('should require auth for orders route', (done) => {
        request.get("/orders").then(res => {
            expect(res.status).toBe(401)
            done()
        })
        request.get(`/orders/${orderId}`).then(res => {
            expect(res.status).toBe(401)
            done() 
        })
        request.delete('/orders').send({
            id: orderId
        }).then(res => {
            expect(res.status).toBe(401)
            done() 
        })
        
    })
    it('should create order', (done) => {
        request.post('/orders').send(order).set('Authorization', "bearer " + token).then(res => {
            const body = res.body;
            const status = res.status;
            
            orderId = body.id;
            expect(status).toBe(200)
            done() 
        })
    })
    it('should get order', (done) => {
        request.get(`/orders/:id`).set('Authorization', "bearer " + token).send({
            id: orderId
        }).then(res => {
            expect(res.status).toBe(200)
            done() 
        })
    })
    it('should get orders', (done) => {
        request.get(`/orders`).set('Authorization', "bearer " + token).then(res => {
            expect(res.status).toBe(200)
            done() 
        })
    })

    it('should delete order', (done) => {
        request.delete('/orders').set('Authorization', "bearer " + token).send({
            id: orderId
        }).then(res => {
            expect(res.status).toBe(200)
            done() 
        })
    })
})
