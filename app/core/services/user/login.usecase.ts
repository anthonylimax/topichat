import { ICache } from "../../../infra/adapters/interfaces/ICache";
import { ILogin } from "../../../infra/database/ILogin";
import { IUserDb } from "../../../infra/database/IUserDb";
import { IUserLogin, LoggedUser } from "../interfaces/IUserUseCase";


export class LoginUseCase implements IUserLogin{
    constructor(private repository : ILogin, private cache : ICache){}
    login(login: string, password: string): LoggedUser {
        try{
        const result = this.repository.login(login, password);
        const token = this.cache.tokenize(result);
        const response : LoggedUser ={
            info: result,
            authentication_token: token.token,
            expireAt: token.expireAt.toISOString()
        }
        return response;
        }
        catch(e){
            throw e;
        }
    }
}