import { User } from "../../models/user"

export interface IUserUseCase{
    exec( photoUrl: string, firstName: string, lastName: string, password: string, email: string): User | undefined
}


export interface IUserLogin{
    login( login : string, password : string ) : LoggedUser
}


export interface LoggedUser {
    authentication_token: string
    info: User,
    expireAt: string
}