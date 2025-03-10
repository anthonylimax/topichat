import { User } from "../../../core/models/user";


export interface ICache{
    get(token : string) : User;
    tokenize(user : User) : tokenInfos;
}


type tokenInfos = {
    token: string
    expireAt: Date
}