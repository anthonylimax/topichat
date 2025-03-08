import { User } from "../../core/models/user";

export interface IUserDb{
    registerUser(user : User ): boolean 
    
}