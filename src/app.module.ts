import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AdminsModule } from './admins/admins.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [UsersModule, DatabaseModule, AdminsModule, BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
