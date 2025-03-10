import { User } from "../../core/models/user";
import { ILogin } from "./ILogin";

export interface IUserDb{
    registerUser(user : User ): boolean 
}
