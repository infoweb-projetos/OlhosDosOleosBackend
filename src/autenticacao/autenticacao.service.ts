import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PersistenciaService } from 'src/persistencia/persistencia.service';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AutenticacaoService {
    constructor(private persistencia: PersistenciaService, private jwt: JwtService) { }

    async login(email: string, senha: string): Promise<TokenDto> {
        let usuario = await this.persistencia.usuario.findUnique({
            where: { email: email },
        });

        if (!usuario) {
            usuario = await this.persistencia.usuario.findUnique({
                where: { usuario: email },
            });
        }

        if (!usuario) {
            throw new NotFoundException(`Usuario com o email ou nome de usuario: ${email} não encontrado`);
        }

        const ehSenhaValida = await bcrypt.compare(senha, usuario.senha);;
        if (!ehSenhaValida) {
            throw new UnauthorizedException('Senha incorreta');
        }

        return {
            acessToken: this.jwt.sign({ usuario: usuario.id }),
        };
    }
    async verificaToken(token: string) {
        try {
            const tokenDescodificado = this.jwt.verify(token);
            const usuario = await this.persistencia.usuario.findUnique({
                where: { id: tokenDescodificado.usuario },
            });
            return {
                estado: 'ok',
                token: tokenDescodificado,
            }
        }
        catch (error) {
            if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
                throw new UnauthorizedException('Token inválido ou expirado.');
            }
            throw new BadRequestException('Erro ao processar a solicitação.');
        }
    }

}