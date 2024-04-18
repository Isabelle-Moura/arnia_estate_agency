import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// All the modules in application goes in here.
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}
