import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'src/config/database';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const databaseConfig = configService.get<DatabaseConfig>('database');
        return {
          type: 'postgres',
          ...databaseConfig,
          /**
           * every entity registered through the forFeature() method
           * will be automatically added to the entities array of the configuration object.
           */
          autoLoadEntities: true,
          // logging: 'all',
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class PostgresDatabaseProviderModule {}
