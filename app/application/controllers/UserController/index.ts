import { NextFunction, Request, Response } from "express";
import { IUserUseCase } from "../../../core/services/interfaces/IUserUseCase";

export class UserController{

    constructor(private service: IUserUseCase){
        this.post = this.post.bind(this)
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