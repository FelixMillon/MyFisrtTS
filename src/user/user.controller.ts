import { User } from './user';
import { UserService } from './user.service';
export class UserController {
    constructor(private userService: UserService) {}
    add(username: string,email: string, password: string): User {
        this.checkString(username, "username");
        this.checkString(email, "email");
        this.checkString(password, "password");
        return this.userService.add(username, email, password);
    }

    getById(id: number): User | null {
        this.checkID(id);
        return this.userService.getById(id);
    }

    updateUser(id: number,username: string, email: string): boolean {
        this.checkID(id);
        this.checkString(username, "username");
        this.checkString(email, "email");
        return this.userService.updateUser(id,username,email);
    }
    
    delete(id: number): boolean {
        this.checkID(id);
        return this.userService.delete(id);
    }

    getByEmail(email: string): User | null {
        this.checkString(email, "email");
        return this.userService.getByEmail(email);
    }

    updatePassword(id: number, password: string): boolean {
        this.checkID(id);
        this.checkString(password, "password");
        this.checkPassword(password);
        return this.userService.updatePassword(id, password);
    }

    private checkID(id: number) {
        // is the id a decimal ?
        if (this.isDecimal(id)) {
            throw new Error('Id is not decimal');
        }
        // is the id a negative number ?
        if (id < 0) {
            throw new Error('Id is negative');
        }
        // other checks
    }

    private checkString(testedString: string,key: string) {
        // is the string empty ?
        if (testedString.length < 1) {
            throw new Error(`${key} is empty`);
        }
        // is the string whitespaced ?
        if (testedString.includes(" ")) {
            throw new Error(`${key} is whitespaced`);
        }
        // other checks
    }

    private isDecimal(id: number): boolean {
        return id % 1 != 0;
    }

    private checkPassword(password: string){
        // is the password robust
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
        if(!regex.test(password)){
            throw new Error(`the password is not robust`);
        }
        // other checks
    }
}