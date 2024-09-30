import { Module } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { DatabaseModule } from 'src/database/database.module';
import { BooksFormatter } from './books.formatter';

@Module({
  imports: [DatabaseModule],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository, BooksFormatter],
})
export class BooksModule {}
