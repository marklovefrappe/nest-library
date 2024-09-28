import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ListBookDto } from './dto/list-book.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class BooksService {
  create({}: CreateBookDto) {
    return 'This action adds a new book';
  }

  findAll({ search, searchType, filter, limit, page }: ListBookDto) {
    return `This action returns all books`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
