import { User } from "../../models/user"

export interface IUserUseCase{
    exec( photoUrl: string, firstName: string, lastName: string, password: string, email: string): User | undefined
}