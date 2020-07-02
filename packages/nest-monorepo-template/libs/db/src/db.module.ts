import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@app/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Test } from './entities';
import { DbTestService } from './services';

const services = [
  DbTestService
]

const repositories = [
  Test
]

@Global()
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          type: config.get('DATABASE_TYPE'),
          host: config.get('DATABASE_HOST'),
          port: config.get('DATABASE_PORT'),
          database: config.get('DATABASE_NAME'),
          username: config.get('DATABASE_USER'),
          password: config.get('DATABASE_PASSWORD'),
          entities: repositories,
          migrations: [__dirname + './migrations/**/*.migration{.ts,.js}'],
          cli: {
            migrationsDir: "./migrations",
            entitiesDir: "./entities"
          },
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature(repositories)
  ],
  providers: [...services],
  exports: [...services],
})
export class DbModule {
  constructor (
    private readonly connection: Connection
  ) {}
}
