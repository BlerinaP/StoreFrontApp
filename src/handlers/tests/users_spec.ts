import {app} from "../../server";
import supertest from "supertest"
import jwt, {Secret} from "jsonwebtoken"


const bcrypt = process.env.BCRYPT_PASSWORD

const request = supertest(app)

describe("user", () => {
    const user = {
        firstname: "blerina",
        lastname: "pllana",
        password: "blerina"
    }

    let userId:number = 1;
    let token:string;

    it('should require auth for users route', (done) => {
        request.get("/users").then(res => {
            expect(res.status).toBe(401)
            done()
        })
        request.get(`/users/${userId}`).then(res => {
            expect(res.status).toBe(401)
            done() 
        })
        request.put(`/users/${userId}`).send({
            firstName: user.firstname,
            lastName: user.lastname
        }).then(res => {
            expect(res.status).toBe(401)
            done() 
        })
        request.delete('/users').send({
            id: userId
        }).then(res => {
            expect(res.status).toBe(401)
            done() 
        })
        
    })
    
    it('should create user', (done) => {
        request.post('/users').send(user).then(res => {
            const body = res.body;
            const status = res.status;
            token = body
            const {user} = jwt.verify(token, bcrypt);
            userId = user.id;
            expect(status).toBe(200)
            done() 
        })
    })

    it('should get all users', (done) => {
        request.get('/users').set('Authorization', "bearer " + token).then(res => {
            expect(res.status).toBe(200)
            done() 
        })
    })

    it('should get user', (done) => {
        request.get(`/users/:id`).set('Authorization', "bearer " + token).send({
            id: userId
        }).then(res => {
            expect(res.status).toBe(200)
            done() 
        })
    })

    it('should delete user', (done) => {
        request.delete('/users').set('Authorization', "bearer " + token).send({
            id: userId
        }).then(res => {
            expect(res.status).toBe(200)
            done() 
        })
    })
})
