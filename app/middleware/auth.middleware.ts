import { NextFunction, Request } from 'express';
import { WebSocket } from 'ws'


export default function useAuthentication(ws: WebSocket, req: Request, next : NextFunction){
    const token = req.query.token;
    console.log(token)
    if(token) {
        next()
        return;
    };
    ws.close(1008, "Token inválido")
}