import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { PersistenciaService } from 'src/persistencia/persistencia.service';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AutenticacaoService {
    constructor(private persistencia: PersistenciaService, private jwt: JwtService){}

    async login(email: string, senha: string): Promise<TokenDto>{
        const usuario = await this.persistencia.usuario.findUnique({
            where: { email: email},
        });

        if (!usuario){
            throw new NotFoundException(`Usuario com o email: ${email} não encontrado`);
        }

        const ehSenhaValida = usuario.senha === senha;
        if (!ehSenhaValida){
            throw new UnauthorizedException();
        }

        return {
            acessToken: this.jwt.sign({usuario: usuario.id}),
        };
    }
}