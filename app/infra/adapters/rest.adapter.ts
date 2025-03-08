import express, {Application} from 'express';
import { router } from '../routes/message.router';
import {userRouter} from '../routes/user.router';

export class RestAdapterExpress{
    private app : Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    routes(){
        this.app.use('/message', router);
        this.app.use('/user', userRouter);
    }

    App(){
        return this.app;
    }

    config(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}))

    }

    listen(port: number){
        this.app.listen(port, ()=>{console.log(`running in localhost:${port}`)})
    }

}