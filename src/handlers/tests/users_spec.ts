import app from "../../server";
import supertest from "supertest"

const request = supertest(app)

describe("user", () => {
    const user = {
        firstname: "blerina",
        lastname: "pllana",
        password: "blerina"
    }
    let token: string, userId:number = 1

    it('should require auth', (done) => {
        request.get("/users").then(res => {
            expect(res.status).toBe(401)
        })
    })
})
