import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PersistenciaService } from 'src/persistencia/persistencia.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EditaBannerDto } from './dto/edita-banner-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private persistencia: PersistenciaService, private jwt: JwtService) { }

  private readonly saltRounds = 10;
  async create(usu: CreateUsuarioDto, arq: Express.Multer.File) {
    if (!usu.nome) throw new BadRequestException('Preencha o campo do nome');
    if (!usu.email) throw new BadRequestException('Preencha o campo de email');
    if (!usu.usuario) throw new BadRequestException('Preencha o campo do nome de usuario');
    if (!usu.senha) throw new BadRequestException('Preencha o campo da senha');

    if (!usu.email.includes('@')) {
      throw new BadRequestException('Email inválido');
    }

    const localizacao = { cidadeid: null, estadoid: null, usuarioid: null };
    if (usu.estadoid) {
      const estado = await this.persistencia.estado.findUnique({
        where: { id: Number(usu.estadoid) },
      });
      if (estado) localizacao.estadoid = estado.id;
    }
    if (usu.cidadeid) {
      const cidade = await this.persistencia.cidade.findUnique({
        where: { id: Number(usu.cidadeid) },
      });
      if (cidade) {
        localizacao.cidadeid = cidade.id;
        if (!localizacao.estadoid) localizacao.estadoid = cidade.estadoid;
      }
    }

    if (usu.tipoid) {
      const tipo = await this.persistencia.tipoArtista.findUnique({
        where: { nome: usu.tipoid },
      });
      if (!tipo) {
        throw new BadRequestException('Tipo de artista invalido');
      }
    }

    if (usu.insta && !(/https?:\/\/.+/.test(usu.insta))) {
      throw new BadRequestException('Link de Instagram inválido');
    }
    if (usu.face && !(/https?:\/\/.+/.test(usu.face))) {
      throw new BadRequestException('Link de Facebook inválido');
    }
    if (usu.zap && !(/https?:\/\/.+/.test(usu.zap))) {
      throw new BadRequestException('Link de WhatsApp inválido');
    }
    if (usu.youtube && !(/https?:\/\/.+/.test(usu.youtube))) {
      throw new BadRequestException('Link de YouTube inválido');
    }

    if (arq) {
      if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(arq.mimetype)) {
        throw new BadRequestException('Arquivo enviado não é uma imagem válida');
      }
    }

    if (usu.cor1) {
      if (usu.cor1.length != 6) {
        throw new BadRequestException('Cor 1 inválida');
      }
    }
    if (usu.cor2) {
      if (usu.cor2.length != 6) {
        throw new BadRequestException('Cor 2 inválida');
      }
    }
    if (usu.cor3) {
      if (usu.cor1.length != 6) {
        throw new BadRequestException('Cor 3 inválida');
      }
    }
    if (usu.cor3) {
      if (usu.cor1.length != 6) {
        throw new BadRequestException('Cor 4 inválida');
      }
    }

    try {
      if (arq) {
        usu.imagem = arq.buffer;
        usu.imagemtipo = arq.mimetype;
      }

      const senhaProtegida = await bcrypt.hash(usu.senha, this.saltRounds);
      usu.senha = senhaProtegida;
      const usuario = await this.persistencia.usuario.create({
        data: {
          nome: usu.nome,
          email: usu.email,
          senha: usu.senha,
          usuario: usu.usuario,
          localizacao: undefined,
          insta: usu.insta,
          youtube: usu.youtube,
          zap: usu.zap,
          face: usu.face,
          tipo: usu.tipoid ? { connect: { nome: usu.tipoid } } : undefined,
          biografia: usu.biografia,
          imagem: usu.imagem,
          imagemtipo: usu.imagemtipo,
          cor1: usu.cor1,
          cor2: usu.cor2,
          cor3: usu.cor3,
          cor4: usu.cor4
        },
      });

      let usuarioFinal = usuario;
      if (localizacao.cidadeid && localizacao.estadoid) {
        const localizacaoNoBD = await this.persistencia.localizacao.create({
          data: {
            cidade: { connect: { id: localizacao.cidadeid } },
            estado: { connect: { id: localizacao.estadoid } },
            usuario: { connect: { id: usuario.id } },

          }
        });

        usuarioFinal = await this.persistencia.usuario.update({
          where: { id: usuario.id },
          data: {
            localizacao: { connect: { id: localizacaoNoBD.id } },
            localizacaoid: localizacaoNoBD.id,
          }
        });
      }

      const { senha, ...dadosPublicosUsuario } = usuarioFinal;

      return {
        estado: 'ok',
        dados: dadosPublicosUsuario,
      };
    }
    catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw new BadRequestException('Algo deu errado:' + error);
    }
  }

  async ultimosCemUsurios() {
    return {
      estado: 'ok',
      dados: await this.persistencia.usuario.findMany({
        take: 100,
        orderBy: {
          entrada: "asc",
        }
      }),
    };
  }

  async acharUsuarioToken(token: string) {
    try {
      const tokenDescodificado = this.jwt.verify(token);
      const usuario = await this.persistencia.usuario.findUnique({
        where: { id: tokenDescodificado.usuario },
        include: {
          localizacao: {
            include: {
              estado: true,
              cidade: true,
            }
          },
          seguidores :{
            include:{
              seguidor: true,
            }
          },
          seguidos :{
            include:{
              usuario: true,
            }
          },
        },
      });

      if (usuario) {
        const { senha, ...dadosPublicosUsuario } = usuario;

        let localizacao = "";
        if (usuario.localizacao?.estadoid && usuario.localizacao?.cidadeid)
          localizacao = "Brasil, " + usuario.localizacao?.estado?.nome + ", " + usuario.localizacao?.cidade?.nome;

        const usuarioCompleto = { ...dadosPublicosUsuario, localizacao: localizacao, estadoid: usuario.localizacao?.estadoid, cidadeid: usuario.localizacao?.cidadeid };

        return {
          estado: 'ok',
          dados: usuarioCompleto,
        };
      }
      else {
        return {
          estado: 'nok',
          mensagem: `usuario com ${tokenDescodificado} não existe!`,
        };
      }
    }
    catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token inválido ou expirado.');
      }
      throw new BadRequestException('Erro ao processar a solicitação.');
    }

  }
  async acharUsuarioId(id: number, token: string) {
    let tokenDescodificado = { usuario: 0 };
    if (token) tokenDescodificado = this.jwt.verify(token);

    const usuario = await this.persistencia.usuario.findUnique({
      where: { id: id },
      include: {
        localizacao: {
          include: {
            estado: true,
            cidade: true,
          }
        },
        seguidores :{
          include:{
            seguidor: true,
          }
        },
        seguidos :{
          include:{
            usuario: true,
          }
        },
      },
    });
    if (usuario) {
      const { senha, ...dadosPublicosUsuario } = usuario;

      let localizacao = "";
      if (usuario.localizacao?.estadoid && usuario.localizacao?.cidadeid)
        localizacao = "Brasil, " + usuario.localizacao?.estado?.nome + ", " + usuario.localizacao?.cidade?.nome;
      let sigo = false
      if(usuario.seguidores) sigo = usuario.seguidores.filter(s => tokenDescodificado && (s.seguidorid == tokenDescodificado.usuario)).length > 0;
      const usuarioCompleto = { ...dadosPublicosUsuario, localizacao: localizacao, sigo: sigo };

      return {
        estado: 'ok',
        dados: usuarioCompleto,
      };
    } else {
      return {
        estado: 'nok',
        mensagem: `usuario com ${id} não existe!`,
      };
    }
  }

  public ehMeuPerfil(token: string, id: number): boolean {
    try {
      if (!token) return false;
      const tokenDescodificado = this.jwt.verify(token);
      if (tokenDescodificado.usuario == id) return true;
      return false;
    }
    catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token inválido ou expirado.');
      }
      console.log(error);
      throw new BadRequestException('Algo deu errado.');
    }
  }

  public validarImagem(file: Express.Multer.File, nome: string) {
    if (file && !['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.mimetype)) {
      throw new BadRequestException(`Arquivo enviado para ${nome} não é uma imagem válida`);
    }
  };
  public validarLink(url: string, plataforma: string) {
    if (url && !(/^https?:\/\/.+/.test(url))) {
      throw new BadRequestException(`Link de ${plataforma} inválido`);
    }
  };

  async atualizar(token: string, usu: UpdateUsuarioDto, foto: Express.Multer.File, banner: Express.Multer.File) {
    const tokenDescodificado = this.jwt.verify(token);
    const usuarioAtual = await this.persistencia.usuario.findUnique({
      where: { id: tokenDescodificado.usuario },
    });
    if (!usuarioAtual) throw new NotFoundException('Erro localizando usuario');
    if (!usu.nome) usu.nome = usuarioAtual.nome;
    if (!usu.email) usu.email = usuarioAtual.email;
    if (!usu.usuario) usu.usuario = usuarioAtual.usuario;

    if (!usu.email.includes('@')) {
      throw new BadRequestException('Email inválido');
    }

    const localizacao = { cidadeid: null, estadoid: null, usuarioid: null };
    if (usu.estadoid) {
      const estado = await this.persistencia.estado.findUnique({
        where: { id: Number(usu.estadoid) },
      });
      if (estado) localizacao.estadoid = estado.id;
    }
    if (usu.cidadeid) {
      const cidade = await this.persistencia.cidade.findUnique({
        where: { id: Number(usu.cidadeid) },
      });
      if (cidade) {
        localizacao.cidadeid = cidade.id;
        if (!localizacao.estadoid) localizacao.estadoid = cidade.estadoid;
      }
    }

    if (usu.tipoid) {
      const tipo = await this.persistencia.tipoArtista.findUnique({
        where: { nome: usu.tipoid },
      });
      if (!tipo) {
        usu.tipoid = null;
      }
    }

    this.validarLink(usu.insta, 'Instagram');
    this.validarLink(usu.face, 'Facebook');
    this.validarLink(usu.zap, 'WhatsApp');
    this.validarLink(usu.youtube, 'YouTube');

    this.validarImagem(foto, 'foto');
    this.validarImagem(banner, 'banner');

    if (usu.cor1) {
      if (usu.cor1.length != 6) {
        throw new BadRequestException('Cor 1 inválida');
      }
    }
    if (usu.cor2) {
      if (usu.cor2.length != 6) {
        throw new BadRequestException('Cor 2 inválida');
      }
    }
    if (usu.cor3) {
      if (usu.cor1.length != 6) {
        throw new BadRequestException('Cor 3 inválida');
      }
    }
    if (usu.cor3) {
      if (usu.cor1.length != 6) {
        throw new BadRequestException('Cor 4 inválida');
      }
    }
    try {
      if (foto) {
        usu.imagem = foto.buffer;
        usu.imagemtipo = foto.mimetype;
      }
      if (banner) {
        usu.banner = banner.buffer;
        usu.bannertipo = banner.mimetype;
      }

      if (usu.senha) {
        const senhaProtegida = await bcrypt.hash(usu.senha, this.saltRounds);
        usu.senha = senhaProtegida;
      } else {
        usu.senha = usuarioAtual.senha;
      }

      let localizacaoBD = await this.persistencia.localizacao.findUnique({
        where: { usuarioid: tokenDescodificado.usuario },
      });
      if (localizacao.cidadeid && localizacao.cidadeid){
        if (localizacaoBD) {
          localizacaoBD = await this.persistencia.localizacao
            .update({
              where: {
                usuarioid: tokenDescodificado.usuario,
              },
              data: {
                cidadeid: localizacao.cidadeid,
                estadoid: localizacao.estadoid,
              }
            });
        }
        else {
          localizacaoBD = await this.persistencia.localizacao
          .create({
            data: {
              usuarioid: tokenDescodificado.usuario,
              cidadeid: localizacao.cidadeid,
              estadoid: localizacao.estadoid,
            }
          });
        }
      }
      else{
        if (localizacaoBD && !usu.ehpersonalizacao){
          localizacaoBD = await this.persistencia.localizacao
          .delete({
            where: {
              usuarioid: tokenDescodificado.usuario,
            },
          });
        }
      }
    
      usu.localizacaoid = localizacaoBD? (localizacaoBD.id ? localizacaoBD.id : undefined) : null;
      const resultado = await this.persistencia.usuario
        .update({
          where: { id: tokenDescodificado.usuario },
          data: {
            nome: usu.nome,
            email: usu.email,
            senha: usu.senha,
            usuario: usu.usuario,
            insta: !usu.ehpersonalizacao ? (usu.insta ? usu.insta : null) : usuarioAtual.insta,
            youtube: !usu.ehpersonalizacao ? (usu.youtube ? usu.youtube : null) : usuarioAtual.youtube,
            zap: !usu.ehpersonalizacao ? (usu.zap ? usu.zap : null) : usuarioAtual.zap,
            face: !usu.ehpersonalizacao ? (usu.face ? usu.face : null) : usuarioAtual.face,
            localizacao: usu.localizacaoid ? { connect: { id: usu.localizacaoid} } : undefined,
            tipoid: !usu.ehpersonalizacao ? (usu.tipoid ? usu.tipoid : null) : usuarioAtual.tipoid,
            biografia: !usu.ehpersonalizacao ? usu.biografia : usuarioAtual.biografia,
            imagem: !usu.ehpersonalizacao ? usu.imagem : usuarioAtual.imagem,
            imagemtipo: !usu.ehpersonalizacao ? usu.imagemtipo : usuarioAtual.imagemtipo,
            banner: usu.ehpersonalizacao ? usu.banner : usuarioAtual.banner,
            bannertipo: usu.ehpersonalizacao ? usu.bannertipo : usuarioAtual.bannertipo,
            cor1: usu.ehpersonalizacao ? usu.cor1 : usuarioAtual.cor1,
            cor2: usu.ehpersonalizacao ? usu.cor2 : usuarioAtual.cor2,
            cor3: usu.ehpersonalizacao ? usu.cor3 : usuarioAtual.cor3,
            cor4: usu.ehpersonalizacao ? usu.cor4 : usuarioAtual.cor4
          },
        })
        .then((usuario) => {
          const { senha, ...dadosPublicosUsuario } = usuario;
          return {
            estado: 'ok',
            dados: dadosPublicosUsuario,
          };
        })
        .catch((error) => {
          console.log(error);
          return {
            estado: 'nok',
            mensagem: `usuario com ${tokenDescodificado.usuario} não existe!`,
          };
        });
      return resultado;
    }
    catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token inválido ou expirado.');
      }
      console.log(error);
      throw new BadRequestException('Algo deu errado.');
    }

  }


  async editarBanner(token: string, usu: EditaBannerDto, banner: Express.Multer.File) {
    this.validarImagem(banner, 'banner');
    try {
      if (banner) {
        usu.banner = banner.buffer;
        usu.bannertipo = banner.mimetype;
      }
      const tokenDescodificado = this.jwt.verify(token);
      const resultado = await this.persistencia.usuario
        .update({
          where: { id: tokenDescodificado.usuario },
          data: {
            banner: usu.banner,
            bannertipo: usu.bannertipo,
          },
        })
        .then((usuario) => {
          const { senha, ...dadosPublicosUsuario } = usuario;
          return {
            estado: 'ok',
            dados: dadosPublicosUsuario,
          };
        })
        .catch((error) => {
          console.log(error);
          return {
            estado: 'nok',
            mensagem: `usuario com ${tokenDescodificado.usuario} não existe!`,
          };
        });
      return resultado;
    }
    catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token inválido ou expirado.');
      }
      console.log(error);
      throw new BadRequestException('Algo deu errado.');
    }

  }

  async removerBanner(token: string) {
    try {
      const tokenDescodificado = this.jwt.verify(token);
      const resultado = await this.persistencia.usuario
        .update({
          where: { id: tokenDescodificado.usuario },
          data: {
            banner: null,
            bannertipo: null,
          },
        })
        .then((usuario) => {
          const { senha, ...dadosPublicosUsuario } = usuario;
          return {
            estado: 'ok',
            dados: dadosPublicosUsuario,
          };
        })
        .catch((error) => {
          console.log(error);
          return {
            estado: 'nok',
            mensagem: `usuario com ${tokenDescodificado.usuario} não existe!`,
          };
        });
      return resultado;
    }
    catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token inválido ou expirado.');
      }
      console.log(error);
      throw new BadRequestException('Algo deu errado.');
    }

  }

  async seguirOuParar(token: string, id: number) {
    const tokenDescodificado = this.jwt.verify(token);
    const usuarioAtual = await this.persistencia.usuario.findUnique({
      where: { id: tokenDescodificado.usuario },
    });
    if (!usuarioAtual) throw new NotFoundException('Erro localizando usuario');

    const seguindo = await this.persistencia.usuarioSeguidor.findUnique({
      where:{usuarioid_seguidorid: {usuarioid:id, seguidorid:tokenDescodificado.usuario}}
    });

    if (seguindo){
      try {
        const resultado = await this.persistencia.usuarioSeguidor.delete({
          where:{usuarioid_seguidorid: {usuarioid:id, seguidorid:tokenDescodificado.usuario}},
          include: {
            usuario: {
              include:{
                seguidores:{
                  include: {
                    seguidor:true,
                  }
                },
              }
            },
          }
        });

        return {
          estado: 'ok',
          dados:  {...resultado, seguindo: false},
        };
      
      } 
      catch (error) {
        return {estado: 'nok', erro: error}
      }
    }
    else{
      try {
        const resultado = await this.persistencia.usuarioSeguidor.create({
          data:{usuarioid:id, seguidorid:tokenDescodificado.usuario},
          include: {
            usuario: {
              include:{
                seguidores:{
                  include: {
                    seguidor:true,
                  }
                },
              }
            },
          }
        });

        return {
          estado: 'ok',
          dados: {...resultado, seguindo: true},
        };
      
      } 
      catch (error) {
        return {estado: 'nok', erro: error}
      }
    }

  }

  async remove(id: number) {
    const resultado = await this.persistencia.usuario
      .delete({ where: { id: id } })
      .then((usuario) => {
        return { estado: 'ok', dados: usuario };
      })
      .catch((error) => {
        console.log(error)
        return {
          estado: 'nok',
          mensagem: `usuario com ${id} não existe!`,
        };
      });
    return resultado;
  }
}
