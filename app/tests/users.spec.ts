import supertest from "supertest";
import userCredentials from './../users.test.json'
import { RestAdapterExpress } from "../infra/adapters/rest.adapter";

describe("testando integracao", ()=>{
    const api = new RestAdapterExpress();
    it("criando user", async ()=>{
        const {email, firstName, lastName, password, photoUrl} = userCredentials[Math.floor(Math.random() * 10)];
        
        const request = await supertest(api.App()).post('/user').send({
            email,
            lastName,
            firstName,
            password,
            photoUrl
        })
        const response = request.body
        expect(response.email).toBe(email)
        expect(response.password).toBe(password)
        expect(response.firstName).toBe(firstName)
        expect(response.lastName).toBe(lastName)
        expect(response.photoUrl).toBe(photoUrl)
        
    })
    it("duplicated register", async ()=>{
        const {email, firstName, lastName, password, photoUrl} = userCredentials[Math.floor(Math.random() * 10)];
        const data = {
            email,
            lastName,
            firstName,
            password,
            photoUrl
        }
        const request = await supertest(api.App()).post('/user').send(data)
        const attemptRequest = await supertest(api.App()).post('/user').send(data);
        expect(request.status).toBe(201)
        expect(attemptRequest.status).toBe(404)

    })
})