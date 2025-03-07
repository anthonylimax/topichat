import { Message } from "../../../core/models/message";
import { GroupMessage, IDb } from "../IDatabase";


export class InMemoryDb implements IDb{
    pushMessage(msg: Message, groupId : number): void {
        this.findGroupById(groupId)?.messages.push(msg);
    }
    
    addUser(user: string, groupId : number): void {
        this.findGroupById(groupId)?.users.push(user)
    }

    private groupMessages : GroupMessage[] = [{
        groupId: 1,
        messages: [],
        users: [],
    }]

    findGroupById(id : number): GroupMessage | undefined {
        return this.groupMessages.find(({groupId}) => groupId === id);
    }
}