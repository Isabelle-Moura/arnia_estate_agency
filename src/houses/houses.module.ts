import { Module } from '@nestjs/common';
import { HousesService } from './houses.service';
import { HousesController } from './houses.controller';
import { House } from '../database/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([House])],
  controllers: [HousesController],
  providers: [HousesService],
})
export class HousesModule {}
