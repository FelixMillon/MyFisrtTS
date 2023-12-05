import { User } from './user';
import { UserService } from './user.service';
import fs from 'fs';

export class UserJSONService implements UserService {

    private users : User[] = []; 
    private filename : string = 'user.json';


    async add(username: string,email: string, password: string): Promise<User> {
        this.checkEmailIsFree(email);
        this.users = JSON.parse(fs.readFileSync(this.filename, 'utf8'));
        let maxUserId = 0;
        for (const user of this.users) {
            if (user.id > maxUserId) {
                maxUserId = user.id;
            }
        }
        const userId = maxUserId + 1;
        const newUser = new User(userId,username,email,password)
        this.users.push(newUser);
        this.PublishUsers(this.users);
        return newUser;
    }

    async getById(id: number): Promise <User | null> {
        this.users = JSON.parse(fs.readFileSync(this.filename, 'utf8'));
        let selectedUser = this.users.find((user: User) => user.id === id);
        if (!selectedUser) {
            return null;
        }
        return(selectedUser);
    }

    async updateUser(id: number, username: string, email: string): Promise <boolean> {

        this.users = JSON.parse(fs.readFileSync(this.filename, 'utf8'));
        const userIndex = this.users.findIndex((user: User) => user.id === id);

        if (userIndex === -1) {
            return false; // L'ID n'a pas été trouvé, renvoyer null ou générer une erreur
        }
        if(email !="null"){
            this.users[userIndex].email = email;
        }
        if(username != "null"){
            this.users[userIndex].username = username;
        }
        this.PublishUsers(this.users);
        return(true);
    }

    async delete(id: number): Promise <boolean> {
        this.users = JSON.parse(fs.readFileSync(this.filename, 'utf8'));
        const userIndex = this.users.findIndex((user: User) => user.id === id);
        if (userIndex === -1) {
            return false;
        }
        this.users.splice(userIndex, 1);
        this.PublishUsers(this.users);
        return(true);
    }

    async getByEmail(email: string): Promise <User | null> {
        this.users = JSON.parse(fs.readFileSync(this.filename, 'utf8'));
        let selectedUser = this.users.find((user: User) => user.email === email);
        if (!selectedUser) {
            return null;
        }
        return(selectedUser);
    }

    async updatePassword(id: number, password: string): Promise <boolean> {
        this.users = JSON.parse(fs.readFileSync(this.filename, 'utf8'));
        const userIndex = this.users.findIndex((user: User) => user.id === id);
        if (userIndex === -1) {
            return false; // L'ID n'a pas été trouvé, renvoyer null ou générer une erreur
        }
        this.users[userIndex].password = password;
        this.PublishUsers(this.users);
        return(true);
    }

    private PublishUsers(Users : User[]){
        const usersJSON: string = JSON.stringify( Users, null, 2);
        fs.writeFileSync(this.filename, usersJSON);
    }

    private checkEmailIsFree(email: string){
        // is the email is free
        this.users = JSON.parse(fs.readFileSync(this.filename, 'utf8'));
        if(this.users.find((u : any) => u.email === email)){
            throw new Error("This email is already used");
        }
        // other checks
    }
}