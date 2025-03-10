import { Message } from "../../../core/models/message";
import { User } from "../../../core/models/user";
import { GroupMessage, IDb } from "../IDatabase";
import { ILogin } from "../ILogin";
import { IUserDb } from "../IUserDb";


export class InMemoryDb implements IDb, IUserDb, ILogin {

    private static instance : InMemoryDb;
    private constructor(){}
    login(email: string, pass: string): User {
        const user = this.users.find(x => x.compareCredentials(email, pass));
        if(user){
            return user;
        }
        throw new Error("Usuario nao existe ou login e senha invalidos")
    }

    static Instance(): InMemoryDb {
        if (!this.instance) {
            this.instance = new InMemoryDb();
        }
        return this.instance;
    }   


    registerUser(user: User): boolean {
        if(this.users.find(x => x.email == user.email)) return false;
        this.users.push(user);
        return true;
    }

    pushMessage(msg: Message, groupId: number): void {
        this.findGroupById(groupId)?.messages.push(msg);
    }

    addUser(user: string, groupId: number): void {
        this.findGroupById(groupId)?.users.push(user)
    }

    private groupMessages: GroupMessage[] = [{
        groupId: 1,
        messages: [],
        users: [],
    }]


    private users: User[] = []

    findGroupById(id: number): GroupMessage | undefined {
        return this.groupMessages.find(({ groupId }) => groupId === id);
    }
}