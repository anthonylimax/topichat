


export class Message{

    private content: string;
    public fromUser : string;
    private date : Date;

    constructor(content : string, fromUser : string){
        this.content = content;
        this.date = new Date();
        this.fromUser = fromUser;
    }
    toJson(){
        return {
            content: this.content,
            date: this.date.toISOString(),
            fromUser: this.fromUser,
            
        }
    }



}