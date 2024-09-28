import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Prisma } from '@prisma/client';
// import { query } from 'express';
import { ListBookDto } from './dto/list-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(
    @Body(new ValidationPipe({ transform: true })) createBookDto: CreateBookDto,
  ) {
    // Get book, check isbn, check enable

    const book = console.log(createBookDto);
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll(
    @Query(new ValidationPipe({ transform: true })) listBookDto: ListBookDto,
  ) {
    console.log(listBookDto);
    return this.booksService.findAll(listBookDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
