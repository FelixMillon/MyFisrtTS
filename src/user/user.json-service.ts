import { User } from './user';
import { UserService } from './user.service';

export class UserJSONService implements UserService {


    add(username: string): User {
        const newUser = new User(12,username)
        return(newUser);
    }
    getById(id: number): User | null {
        const selectedUser = new User(id,"Jeanjean")
        return(selectedUser);
    }
    updateName(id: number, name: string): void {
        throw new Error('Method not implemented.');
    }
    delete(id: number): void {
        throw new Error('Method not implemented.');
    }
}