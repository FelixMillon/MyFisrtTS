import { User } from './user';
import { UserService } from './user.service';
export class UserController {
    constructor(private userService: UserService) {}
    add(username: string): User {
        // is the username empty ?
        if(username.length < 1){
            throw new Error('Username empty');
        }
        // is the username whitespaced ?
        if(username.includes(" ")){
            throw new Error('Username is whitespaced');
        }
        // other checks...
        return this.userService.add(username);
    }
    getById(id: number): User | null {
        // is the id a decimal ?
        if(this.isDecimal(id)){
            throw new Error('Id is not decimal');
        }
        // is the id a negative number ?
        if(id < 0){
            throw new Error('Id is negative');
        }
        // other checks...
        return this.userService.getById(id);
    }
    updateName(id: number,username: string): void {
        // is the username empty ?
        if(username.length < 1){
            throw new Error('Username empty');
        }
        // is the username whitespaced ?
        if(username.includes(" ")){
            throw new Error('Username is whitespaced');
        }
        // other checks...

        // is the id a decimal ?
        if(this.isDecimal(id)){
            throw new Error('Id is not decimal');
        }
        // is the id a negative number ?
        if(id < 0){
            throw new Error('Id is negative');
        }
        // other checks...
        return this.userService.updateName(id,username);
    }
    delete(id: number): void {
        // is the id a decimal ?
        if(this.isDecimal(id)){
            throw new Error('Id is not decimal');
        }
        // is the id a negative number ?
        if(id < 0){
            throw new Error('Id is negative');
        }
        // other checks...
        return this.userService.delete(id);
    }

    private isDecimal(id: number): boolean {
        return id % 1 != 0;
    }
}