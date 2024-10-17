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
  ParseIntPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { ListBookDto } from './dto/list-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(
    @Body(new ValidationPipe({ transform: true })) createBookDto: CreateBookDto,
  ) {
    return await this.booksService.create(createBookDto);
  }

  @Post('/rent')
  async rentBook(
    @Body(new ValidationPipe({ transform: true })) createBookDto: CreateBookDto,
  ) {
    return await this.booksService.create(createBookDto);
  }

  @Get()
  async findAll(
    @Query(new ValidationPipe({ transform: true })) listBookDto: ListBookDto,
  ) {
    console.log(listBookDto);
    return await this.booksService.findAll(listBookDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.booksService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true })) updateBookDto: UpdateBookDto,
  ) {
    return await this.booksService.update(id, updateBookDto);
  }
}
