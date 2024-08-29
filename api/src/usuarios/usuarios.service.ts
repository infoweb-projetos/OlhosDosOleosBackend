import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PersistenciaService } from 'src/persistencia/persistencia.service';

@Injectable()
export class UsuariosService {
  constructor(private persistencia: PersistenciaService) { }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = await this.persistencia.usuario.create({
      data: createUsuarioDto,
    });
    return {
      estado: 'ok',
      dados: usuario,
    };
  }

  async findAll() {
    return {
      estado: 'ok',
      dados: await this.persistencia.usuario.findMany({}),
    };
  }

  async findOne(id: number) {
    const usuario = await this.persistencia.usuario.findUnique({
      where: { id: id },
    });
    if (usuario) {
      return {
        estado: 'ok',
        dados: usuario,
      };
    } else {
      return {
        estado: 'nok',
        mensagem: `usuario com ${id} não existe!`,
      };
    }
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const resultado = await this.persistencia.usuario
      .update({
        where: { id: id },
        data: updateUsuarioDto,
      })
      .then((usuario) => {
        return {
          estado: 'ok',
          dados: usuario,
        };
      })
      .catch((error) => {
        return {
          estado: 'nok',
          mensagem: `usuario com ${id} não existe!`,
        };
      });
    return resultado;
  }

  async remove(id: number) {
    const resultado = await this.persistencia.usuario
      .delete({ where: { id } })
      .then((usuario) => {
        return { estado: 'ok', dados: usuario };
      })
      .catch((error) => {
        return {
          estado: 'nok',
          mensagem: `usuario com ${id} não existe!`,
        };
      });
    return resultado;
  }
}
