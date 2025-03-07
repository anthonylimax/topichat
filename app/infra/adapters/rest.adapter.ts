import {Application} from 'express';

export class RestAdapterExpress{
    private app : Application;

    constructor(app : Application){
        this.app = app;
    }

    private GetMessageRouters(){
        this.app.use()
    }
}