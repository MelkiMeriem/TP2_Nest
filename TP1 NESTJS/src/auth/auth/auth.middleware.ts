import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['auth-user'] as string;
    
    if (!authHeader) {
      throw new UnauthorizedException('Token d\'authentification manquant');
    }

    try {
      // Décoder le token JWT
      const decoded = jwt.verify(authHeader, 'your-secret-key') as any;
      
      // Extraire le userId du token
      const userId = decoded.userId;
      
      if (!userId) {
        throw new UnauthorizedException('Token invalide : userId manquant');
      }

      // Injecter le userId dans l'objet request
      (req as any).userId = userId;
      
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException('Token JWT invalide');
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedException('Token JWT expiré');
      }
      throw new UnauthorizedException('Erreur d\'authentification');
    }
  }
}
