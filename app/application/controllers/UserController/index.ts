import { NextFunction, Request, Response } from "express";
import { IUserLogin, IUserUseCase } from "../../../core/services/interfaces/IUserUseCase";

export class UserController{

    constructor(private service: IUserUseCase, private Login : IUserLogin){
        this.post = this.post.bind(this)
        this.login = this.login.bind(this)
    }

    login(req : Request, res: Response){
        try{
            const { email, password } = req.body;
            const data = this.Login.login(email, password);
            res.status(200).json(data);
        }
        catch(e){
            res.status(404).send({content: "Usuarios não existe"});
        }
    }


    post(req : Request, res: Response){
        try{
            const { email, password, photoUrl, lastName, firstName } = req.body;
            const result = this.service.exec(photoUrl, firstName, lastName, password, email);
            if(typeof result === "undefined") res.status(404).json({content: "conta ja criada"});
            res.status(201).json(result);
        }
        catch(e){
            res.send(e).status(500);
        }
    }
}