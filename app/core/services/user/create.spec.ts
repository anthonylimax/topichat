import { RegisterUser } from "./create.usecase"
import { IUserDb } from "./../../../infra/database/IUserDb"
import users from './../../../users.test.json'
import { User } from "../../models/user"

describe("Testing Register User", ()=>{
    it("Standard register", ()=>{

        const userCredentials = users[Math.floor(Math.random() * 10)]
        const userDbMock: IUserDb = {
            registerUser: jest.fn().mockReturnValue(true),
        };
        
        const register = new RegisterUser(userDbMock);
        const response = register.exec(userCredentials.photoUrl, userCredentials.firstName, userCredentials.lastName, userCredentials.password, userCredentials.email);
        expect(response?.firstName).toBe(userCredentials.firstName);
        expect(response?.lastName).toBe(userCredentials.lastName);
        expect(response?.photoUrl).toBe(userCredentials.photoUrl);
        expect(response?.compareCredentials(userCredentials.email, userCredentials.password)).toBeTruthy();
    })
    it("Duplicating Users", ()=>{
        const userCredentials = users[Math.floor(Math.random() * 10)]
        const userDbMock: IUserDb = {
            registerUser: jest.fn().mockImplementationOnce(()=>false),
        };
        
        const register = new RegisterUser(userDbMock);
        
        const duplicateResponse = register.exec(userCredentials.photoUrl, userCredentials.firstName, userCredentials.lastName, userCredentials.password, userCredentials.email)
        expect(duplicateResponse).toBeUndefined();
    })
})