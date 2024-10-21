import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecret } from 'src/autenticacao/autenticacao.module';
import { PersistenciaService } from 'src/persistencia/persistencia.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') { //nome usado no guard
  constructor(private persistencia: PersistenciaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { usuario: number }) {
    const usuario = await this.persistencia.usuario.findUnique({
        where: {id: payload.usuario}
    });

    if (!usuario) {
      throw new UnauthorizedException();
    }

    return usuario;
  }
}