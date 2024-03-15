import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app';
import { databaseConfig } from './config/database';
import { ENV, ENV_LOCAL } from './common/constants';
import { UsersModule } from './core/users/users.module';
import { PostgresDatabaseProviderModule } from './config/providers';
import { ExceptionsLoggerFilter } from './config/helpers';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { RolesModule } from './core/roles/roles.module';
import { PermissionsModule } from './core/permissions/permissions.module';
import { PermissionGroupsModule } from './core/permission-groups/permission-groups.module';
import { AuthModule } from './core/auth/auth.module';
import { AuthGuard } from './core/auth/guard/auth.guard';
import { RolesGuard } from './common/helpers/guards';
import { CaslModule } from './core/casl/casl.module';
import { AccessTokensModule } from './core/access-tokens/access-tokens.module';
import { RefreshTokensModule } from './core/refresh-tokens/refresh-tokens.module';

@Module({
  imports: [
       // #region Config Module
       ConfigModule.forRoot({
        load: [appConfig, databaseConfig],
        /**
         * @note By default, the package looks for a .env file in the root directory of the application.
         * if it doesn't exists, it will use .env.local as a fallback.
         */
        envFilePath: [ENV, ENV_LOCAL],
        isGlobal: true,
        cache: true,
      }),

       // #region Postgres Database Provider Module
        PostgresDatabaseProviderModule,
      // #endregion

       UsersModule,
       RolesModule,
       PermissionsModule,
       PermissionGroupsModule,
       AuthModule,
       CaslModule,
       AccessTokensModule,
       RefreshTokensModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}

}
