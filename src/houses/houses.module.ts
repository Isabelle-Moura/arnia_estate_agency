import { Module } from '@nestjs/common';
import { HousesService } from './houses.service';
import { HousesController } from './houses.controller';
import { House } from '../database/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([House]), UsersModule],
  controllers: [HousesController],
  providers: [HousesService],
})
export class HousesModule {}
