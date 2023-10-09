import { User } from './user';
import { UserService } from './user.service';
import MySQLConnection from '../database/mysql';

export class UserMySQLService implements UserService {


    add(username: string, email:string, password:string): User {

        const db = MySQLConnection.getInstance();
        
        db.connect();
        
        const userInsertQuery = `INSERT INTO user (email_user, username_user, password_user) VALUES ('${email}', '${username}', '${password}')`;
        const newUser = new User(1,email, username, password)
        db.query(userInsertQuery, (error: any, results: any) => {
            if (error) {
                console.error('Erreur lors de l\'insertion de l\'utilisateur :', error);
            } else {
                console.log(results);
            }
        });
        db.close();
        return newUser;
    }

    getById(id: number): User | null {
        const newUser = new User(id,'test@example.com', 'utilisateur_test', 'mot_de_passe_test')
        return(newUser);
    }

    updateUser(id: number, username: string, email: string): boolean {
        const newUser = new User(id,email, username, 'mot_de_passe_test');
        return(true);
    }

    delete(id: number): boolean {
        const newUser = new User(id,'test@example.com', 'utilisateur_test', 'mot_de_passe_test')
        return(true);
    }

    getByEmail(email: string): User | null {
        const newUser = new User(1,email, 'utilisateur_test', 'mot_de_passe_test')
        return(newUser);
    }

    updatePassword(id: number, password: string): boolean {
        const newUser = new User(id,'test@example.com', 'utilisateur_test', password)
        return(true);
    }
}