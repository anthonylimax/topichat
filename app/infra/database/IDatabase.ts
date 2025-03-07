import { WebSocket } from 'ws'
import { Message } from '../../core/models/message'
export interface IDb{
    findGroupById(id : number) : GroupMessage | undefined,
    pushMessage(msg : Message, groupId : number) : void
    addUser(user : string, groupId : number) : void
} 

export type GroupMessage = {
    groupId: number,
    users: string[],
    messages: Message[]
}