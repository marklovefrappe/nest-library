import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AdminsModule } from './admins/admins.module';
import { BooksModule } from './books/books.module';
import { InstancesModule } from './instances/instances.module';

@Module({
  imports: [UsersModule, DatabaseModule, AdminsModule, BooksModule, InstancesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
