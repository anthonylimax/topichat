import { User } from "../../core/models/user";

export interface ILogin{
    login(email: string, pass : string) : User
}
