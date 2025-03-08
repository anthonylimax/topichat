import { IUserDb } from "../../../infra/database/IUserDb";
import { User } from "../../models/user";
import { IUserUseCase } from "../interfaces/IUserUseCase";
import crypto from 'crypto'

export class RegisterUser implements IUserUseCase { 
    
    constructor(private repository: IUserDb){}
    
    exec(photoUrl: string, firstName: string, lastName: string, password: string, email: string): User | undefined {

        const newUser = new User(crypto.randomUUID(), photoUrl, firstName, lastName, password, email);
        const result = this.repository.registerUser(newUser);
        if(result) return newUser;
        
    }
}