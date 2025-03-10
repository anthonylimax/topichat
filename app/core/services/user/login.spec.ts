import { CacheInMemory } from "../../../infra/adapters/cache.adapter";
import { ICache } from "../../../infra/adapters/interfaces/ICache";
import { ILogin } from "../../../infra/database/ILogin";
import { User } from "../../models/user";
import { LoginUseCase } from "./login.usecase"

const expectUser = new User("", "", "", "", "", "")
const now = new Date();
const expireAt = new Date(now.getTime() + 86400)

const userCacheMock : ICache = {
    get: (token: string)=>{
        return expectUser;
    },
    tokenize: (user: User) => {
        return {
            token: "55cdc5da-f5ad-4cf8-9479-932b1f53ec02",
            expireAt: expireAt
        };
    }
};

const userDbMock: ILogin = {
    login: jest.fn().mockReturnValue(() => {
        throw new Error();
    }),
};


describe("loggin", () => {
    it("Failure attempt of login", () => {
        const loginUseCase = new LoginUseCase(userDbMock, userCacheMock);
        const result = loginUseCase.login("email", "pass")
        expect(result.authentication_token).toBe('55cdc5da-f5ad-4cf8-9479-932b1f53ec02')
        expect(result.expireAt).toBe(expireAt.toISOString())
    })
})