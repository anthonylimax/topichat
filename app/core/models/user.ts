export class User {



    constructor(
        public id: string,
        public photoUrl: string,
        public firstName: string,
        public lastName: string,
        private password: string,
        public email: string
    ) {}


    compareCredentials(email: string, password: string) {
        if (this.email === email && this.password === password) return true;
        return false;
    }
}