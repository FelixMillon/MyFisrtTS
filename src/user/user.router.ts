import { Router } from 'express';
import { UserController } from './user.controller';
export class UserRouter {
    router = Router();
    constructor(private userController: UserController) {
        this.configureRoutes();
    }
    private configureRoutes(): void {
        this.router.get('/get-user/:id', (req, res, next) => {
            try {
                const result = this.userController.getById(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.post('/add-user', (req, res, next) => {
            try {
                const result = this.userController.add(req.body.username);
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.put('/update-user', (req, res, next) => {
            try {
                const { id, username } = req.body;
                const updateName = this.userController.updateName(id,username)
                res.status(200).json(updateName);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.delete('/delete-user/:id', (req, res, next) => {
            try {
                const result = this.userController.delete(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        // other routes...
    }
}