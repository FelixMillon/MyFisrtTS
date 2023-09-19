import { User } from './user';

export interface UserService{
    add(username: string, email:string, password:string): User;
    getById(id: number): User | null;
    getByEmail(email: string): User | null;
    delete(id: number): boolean;
    updateUser(id: number,name: string,email: string): boolean;
    updatePassword(id: number, password: string): boolean;
}