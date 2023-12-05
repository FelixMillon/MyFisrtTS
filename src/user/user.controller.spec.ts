import { User } from './user';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
    let sut: UserController;
    let userService: UserServiceSpy;

    beforeEach(() => {
        userService = new UserServiceSpy();
        sut = new UserController(userService);
    });

    describe('add', () => {
         it('should throw an error when given username is empty', async () => {
            const usernames: string[] = ['', 'toto ', '   toto  '];
            const emails: string[] = ['', ' ', ' toto  ','toto '];
            const passwords: string[] = ['','toto','123','Azerty123456','Azerty@123 '];
            for (const username of usernames) {
                await expect(sut.add(username, "test@gmail.com", "Azert@123" )).rejects.toThrow();
            }
            for (const email of emails) {
                await expect(sut.add("toto", email, "Azert@123" )).rejects.toThrow();
            }
            for (const password of passwords) {
                await expect(sut.add("toto", "test@gmail.com", password )).rejects.toThrow();
            }
        });

        it('should call add from UserService when given username is valid', async () => {
            const validUsernames: string[] = ['username_1', 'us', 'test'];
            const validEmails: string[] = ['toto@gmail.com', 'toto@outlook.com','toto.toto@gmail.com'];
            const validPasswords: string[] = ['ToTotoTO@1Toto','Azerty@123456974','Azerty@123'];

            for (const validUsername of validUsernames) {
                await sut.add(validUsername, "test@gmail.com", "Azert@123");
            }

            for (const validEmail of validEmails) {
                await sut.add("toto", validEmail, "Azert@123");
            }

            for (const validPassword of validPasswords) {
                await sut.add("toto", "test@gmail.com", validPassword);
            }

            await expect(userService.callsToAdd).toBe(validUsernames.length+validEmails.length+validPasswords.length);
        });
    });
});

class UserServiceSpy implements UserService {
    callsToAdd = 0;
    callsToGetById = 0;
    callsToGetByEmail = 0;
    callsToDelete = 0;
    callsToUpdateUser = 0;
    callsToUpdatePassword = 0;

    private dummyUser = new User(0, '','','');

    async add(username: string): Promise< User | null > {
        this.callsToAdd++;
        return this.dummyUser;
    }
    async getById(id: number): Promise<User | null>{
        this.callsToGetById++;
        return this.dummyUser;
    };
    async getByEmail(email: string): Promise<User | null>{
        this.callsToGetByEmail++;
        return this.dummyUser;
    };
    async delete(id: number): Promise<boolean>
    {
        this.callsToGetById++;
        return true;
    };
    
    async updateUser(id: number,name: string,email: string): Promise<boolean>
    {
        this.callsToGetById++;
        return true;
    };
    async updatePassword(id: number, password: string): Promise<boolean>
    {
        this.callsToGetById++;
        return true;
    };
}
