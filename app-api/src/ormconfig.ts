import { DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
  type: 'sqlite',
  database: ':memory:', //persistencia enquanto roda
  dropSchema: true,
  synchronize: true,
  entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
};