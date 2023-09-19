import { User } from './user';
import { UserService } from './user.service';

export class UserJSONService implements UserService {

    add(username: string,email: string, password: string): User {
        const newUser = new User(12,username,email,password)
        return(newUser);
    }

    getById(id: number): User | null {
        const selectedUser = new User(id, "Jeanjean", "jj@gmail.com", "123")
        return(selectedUser);
    }

    updateUser(id: number, name: string, email: string): boolean {
        const updatedUser = new User(id, name, email, "123")
        throw new Error(JSON.stringify(updatedUser));
        return(true);
    }

    delete(id: number): boolean {
        throw new Error(id.toString());
        return(true);
    }

    getByEmail(email: string): User | null {
        const selectedUser = new User(10, "Jeanjean", email, "123")
        return(selectedUser);
    }

    updatePassword(id: number, password: string): boolean {
        const updatedUser = new User(id, "Jeanjean", "jj@gmail.com", password)
        throw new Error(JSON.stringify(updatedUser));
        return(true);
    }
}