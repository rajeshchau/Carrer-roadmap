import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import { AuthRequest } from '../middleware/authMiddleware';

export class AuthController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await AuthService.register(req.body);
            res.status(201).json({
                status: 'success',
                data: result,
            });
        } catch (err) {
            next(err);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await AuthService.login(req.body);
            res.status(200).json({
                status: 'success',
                data: result,
            });
        } catch (err) {
            next(err);
        }
    }

    static async getProfile(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const user = await AuthService.getProfile(req.user!.id);
            res.status(200).json({
                status: 'success',
                data: { user },
            });
        } catch (err) {
            next(err);
        }
    }
}
