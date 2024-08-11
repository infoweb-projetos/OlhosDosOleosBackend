import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('increment')
  UsuarioId: number;

  @Column({ type: 'varchar', length: 200, nullable: true })
  Nome: string;

  @Column({ type: 'varchar', nullable: false })
  Senha: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  Email: string;

  @Column({ type: 'varchar', nullable: true })
  Tipo: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  Localizacao: string;

  @Column({ type: 'varchar', length: 2000, nullable: true })
  Descricao: string;

  @Column({ type: 'varchar', nullable: true })
  Zap: string;

  @Column({ type: 'varchar', nullable: true })
  Insta: string;

  @Column({ type: 'varchar', nullable: true })
  Face: string;

  @Column({ type: 'varchar', nullable: true })
  Twitter: string;

  @Column({ type: 'varchar', nullable: true })
  Foto: string;
}
