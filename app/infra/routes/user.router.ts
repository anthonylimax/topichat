import { Router } from "express";
import { UserController } from "../../application/controllers/UserController";
import { RegisterUser } from "../../core/services/user/create.usecase";
import { InMemoryDb } from "../database/in-memory";


const userRouter = Router();
const repository = InMemoryDb.Instance();
const service = new RegisterUser(repository)
const controller = new UserController(service)

userRouter.post('/', controller.post)

export {userRouter}