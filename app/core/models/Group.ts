import { Topic } from "./topics";
import { User } from "./user";

export class Group{

    public users : User[];

    constructor(
        private id : string,
        public topic : Topic,

    ){
        this.users = [];
    }
    addNewUser(user: User){
        this.users.push(user);
    }
}