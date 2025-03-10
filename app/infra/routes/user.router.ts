import { Router } from "express";
import { UserController } from "../../application/controllers/UserController";
import { UserService } from "../../core/services/user/create.usecase";
import { InMemoryDb } from "../database/in-memory";
import { LoginUseCase } from "../../core/services/user/login.usecase";
import { CacheInMemory } from "../adapters/cache.adapter";


const userRouter = Router();
const repository = InMemoryDb.Instance();
const cacheInMemory = new CacheInMemory(); 
const service = new UserService(repository)
const login = new LoginUseCase(repository, cacheInMemory)
const create = new UserController(service, login)
userRouter.post('/', create.post)
userRouter.post('/login', create.login)


export {userRouter}