import { Module } from '@nestjs/common';
import { InstancesService } from './instances.service';
import { InstancesController } from './instances.controller';
import { DatabaseModule } from 'src/database/database.module';
import { InstancesRepository } from './instances.repository';
import { InstancesFormatter } from './instances.formatter';

@Module({
  imports: [DatabaseModule],
  controllers: [InstancesController],
  providers: [InstancesService, InstancesRepository, InstancesFormatter],
})
export class InstancesModule {}
