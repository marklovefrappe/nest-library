import { Injectable, Inject } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ListBookDto } from './dto/list-book.dto';
import { BooksRepository } from './books.repository';
import { BooksFormatter } from './books.formatter';
import { Book } from '@prisma/client';
import * as Type from './books.type';

@Injectable()
export class BooksService {
  constructor(
    private readonly db: BooksRepository,
    private readonly format: BooksFormatter,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<string> {
    const { isbn, enable } = createBookDto;

    const book = await this.db.getBookByFields({ isbn, enable });
    if (book) {
      throw new Error('Book already exists');
    }

    await this.db.createBook(createBookDto);
    return 'Create book successfully';
  }

  async findAll(listBookDto: ListBookDto): Promise<Type.FindAll.ReturnType> {
    const books = await this.db.getAllBooks(listBookDto);
    const { books: _books } = books;
    console.log(_books);

    const response = this.format.formatfindAll({ books });
    return response;
  }

  async findOne(id: number) {
    const book = await this.db.getBookById(id, true);
    if (!book) {
      throw new Error('Book not found');
    }

    const response = this.format.formatfindOne({ book });
    return response;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.db.getBookById(id, false);
    if (!book) {
      throw new Error('Book not found');
    }

    await this.db.updateBook(id, updateBookDto);
    return 'Update book successfully';
  }
}
