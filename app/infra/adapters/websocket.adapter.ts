import { Application } from "express";
import expressWs from "express-ws";
import { SendMessages } from "../../core/services/messages/send.usecase";
import {WebSocket} from 'ws'
import useAuthentication from "../../middleware/auth.middleware";
import { InMemoryDb } from "../database/in-memory";

export function webSocket(app: Application){
    const appWs = expressWs(app).app;
    const inMemoryDb = new InMemoryDb();
    const handleSender = new SendMessages(inMemoryDb);
    appWs.ws('/send', (ws, req)=>{

        useAuthentication(ws, req, ()=>{
            handleSender.Connected(ws, req)
            handleSender.exec(ws, req);
        })
        
    })
}