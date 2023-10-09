import { User } from './user';
import { UserService } from './user.service';
import fs from 'fs';

export class UserJSONService implements UserService {

    private users : User[] = []; 
    private filename : string = 'user.json';


    add(username: string,email: string, password: string): User {
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

    getById(id: number): User | null {
        this.users = JSON.parse(fs.readFileSync(this.filename, 'utf8'));
        let selectedUser = this.users.find((user: User) => user.id === id);
        if (!selectedUser) {
            return null;
        }
        return(selectedUser);
    }

    updateUser(id: number, username: string, email: string): boolean {

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

    delete(id: number): boolean {
        this.users = JSON.parse(fs.readFileSync(this.filename, 'utf8'));
        const userIndex = this.users.findIndex((user: User) => user.id === id);
        if (userIndex === -1) {
            return false;
        }
        this.users.splice(userIndex, 1);
        this.PublishUsers(this.users);
        return(true);
    }

    getByEmail(email: string): User | null {
        this.users = JSON.parse(fs.readFileSync(this.filename, 'utf8'));
        let selectedUser = this.users.find((user: User) => user.email === email);
        if (!selectedUser) {
            return null;
        }
        return(selectedUser);
    }

    updatePassword(id: number, password: string): boolean {
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
}