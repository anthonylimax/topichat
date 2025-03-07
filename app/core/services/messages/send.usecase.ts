
import { ISend } from "../interfaces/ISend";
import { WebSocket } from 'ws'
import { Request } from "express";
import { Message } from "../../models/message";
import { GroupMessage, IDb } from "../../../infra/database/IDatabase";


type RelSocketToken = {
    [a: string]: WebSocket
}


export class SendMessages implements ISend {


    private list: Set<RelSocketToken> = new Set();
    private db: IDb;


    constructor(db: IDb) {
        this.db = db;
    }

    public exec(ws: WebSocket, req: Request): void {
        this.Message(ws, req);
        this.Closed(ws);
    }

    public Connected(ws: WebSocket, req: Request) {
        const element: RelSocketToken = {
            [req.headers["sec-websocket-key"]!.toString()]: ws
        };
        this.list.add(element);
        ws.send(JSON.stringify(this.db.findGroupById(1)?.messages))
    }
    
    private Message(ws: WebSocket, req: Request) {
        ws.on('message', (message) => {
            const json = JSON.parse(message.toString());
            const groupId = +json.groupId;
            this.db.addUser(req.headers["sec-websocket-key"]!.toString(), groupId);
            const msg = json.message;
            const user = json.user;
            const tempMsg = new Message(msg, user);
            this.db.pushMessage(tempMsg, groupId)
            this.NotificateAllExceptSender(ws, message);
        })
    }

    private NotificateAll(ws: WebSocket, msg: any) {
        this.list.forEach(socket => {
            const key = Object.keys(socket)[0];
            if (socket[key] !== ws) socket[key].send(msg)
        });
    }

    private NotificateAllExceptSender(ws: WebSocket, message: any) {
        this.list.forEach(socket => {
            const json = JSON.parse(message.toString());
            const groupId = +json.groupId;
            const group: GroupMessage | undefined = this.db.findGroupById(groupId);
            const key = Object.keys(socket)[0];
            const curr_ws = socket[key];
            if (ws !== curr_ws && group?.users.includes(key)) {
                curr_ws.send(JSON.stringify(group.messages))
            }
        });
    }

    private Closed(ws: WebSocket) {
        ws.on('close', () => {
            this.list.forEach((socket) => {
                const key = Object.keys(socket)[0];
                if (socket[key] === ws) {
                    this.list.delete(socket);
                }
            })
            this.NotificateAll(ws, "Usuario desconectou")
        })
    }

}