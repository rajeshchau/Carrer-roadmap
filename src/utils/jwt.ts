import jwt, { SignOptions } from 'jsonwebtoken';

export const generateToken = (payload: { id: string; role: string }) => {
    const options: SignOptions = {
        expiresIn: (process.env.JWT_EXPIRE_IN || '1d') as any,
    };
    return jwt.sign(payload, process.env.JWT_SECRET || 'secret', options);
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret') as {
        id: string;
        role: string;
    };
};
