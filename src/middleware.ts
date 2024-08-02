import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const crypto = require('crypto');
const SECRET_KEY = 't';

export interface Usuario {
    userId: number;
    userNome: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Espera o formato "Bearer [token]"

  if (token == null) return res.sendStatus(401); // Se não houver token

  jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
    if (err) return res.sendStatus(403); // Se o token for inválido
    req.user = user; // Adiciona o usuário decodificado ao objeto `req`
    next(); // Passa para o próximo middleware ou rota
  });
};
