import supertest from "supertest";
import userCredentials from './../users.test.json'
import { RestAdapterExpress } from "../infra/adapters/rest.adapter";
import { LoggedUser } from "../core/services/interfaces/IUserUseCase";

describe("Integration Test - USER ENDPOINTS", () => {
    const api = new RestAdapterExpress();
    it("This endpoint must be able to create an user", async () => {
        const { email, firstName, lastName, password, photoUrl } = userCredentials[1];

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
    it("This test should report that your login is not available", async () => {
        const { email, password } = userCredentials[3];
        const request = await supertest(api.App()).post('/user/login').send(
            { email, password }
        )
        expect(request.body)
            .toStrictEqual({ content: 'Usuarios não existe' })
        expect(request.status)
            .toBe(404)
    })
    it("This test should be throw an error - Account is registered", async () => {
        const { email, firstName, lastName, password, photoUrl } = userCredentials[2];
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
        expect(attemptRequest.body).toStrictEqual({ content: 'conta ja criada' })

    })

    it("This test must be able to log you in", async () => {
        const { email, password } = userCredentials[1];
        const request = await supertest(api.App()).post('/user/login').send(
            { email, password }
        )
        const data: LoggedUser = request.body;
        expect(data).toHaveProperty("authentication_token");
        expect(data).toHaveProperty("expireAt");
        expect(data).toHaveProperty("info");


    })
})