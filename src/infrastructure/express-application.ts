import { ExpressServer } from './express-server';
import * as dotenv from 'dotenv';
import { ExpressRouter } from './express-router';
import { UserService } from '../user/user.service';
import { UserJSONService } from '../user/user.json-service';
import { UserMySQLService } from '../user/user.mysql-service';

export class ExpressApplication {
    private expressRouter!: ExpressRouter;
    private port!: string;
    private server!: ExpressServer;
    private userService!: UserService;

    constructor() {
        this.configureApplication();
    }

    bootstrap(): void {
        this.server.bootstrap();
    }

    private configureApplication() {
        this.configureEnvironment();
        this.configureServerPort();
        this.configureServices();
        this.configureExpressRouter();
        this.configureServer();
    }

    private configureEnvironment(): void {
        dotenv.config({
            path: '.env',
        });
    }

    private configureServerPort() {
        this.port = this.getPort();
    }

    private configureServices(){
        this.userService = new UserJSONService();
        //this.userService = new UserMySQLService();
    }

    private configureExpressRouter(){
        this.expressRouter = new ExpressRouter(this.userService);
    }

    private configureServer() {
        this.server = new ExpressServer(this.expressRouter, this.port);
    }

    private getPort(): string {
        const port = process.env.PORT;
        if (!port) {
            throw new Error('No port was found in env file.');
        }
        return port;
    }
}
