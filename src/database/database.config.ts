import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// useFactory: is a function that creates custom configurations for services using injected dependencies.

export default <TypeOrmModuleAsyncOptions>{
  inject: [ConfigService], // Injects the ConfigService.

  useFactory: async (
    configService: ConfigService,
  ): Promise<PostgresConnectionOptions> => {
    return <PostgresConnectionOptions>{
      type: 'postgres', // Database type.
      host: configService.get('DB_HOST'), // Database host.
      port: +configService.get('DB_PORT'), // Database port.
      username: configService.get('DB_USERNAME'), // Database username.
      password: configService.get('DB_PASSWORD'), // Database password.
      database: configService.get('DB_NAME'), // Database name.
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Database entities.
      synchronize: true, // Synchronize database changes automatically.
    };
  },
};
