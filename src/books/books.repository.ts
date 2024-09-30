import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ListBookDto } from './dto/list-book.dto';
import { Prisma, Book, BookInstance } from '@prisma/client';
import * as Type from './books.type';

@Injectable()
export class BooksRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async getBookById(id: number) {
    return this.prisma.book.findUnique({
      where: { id },
    });
  }
  async getBookByFields({ isbn, enable }: Partial<Book>): Promise<Book | null> {
    return this.prisma.book.findFirst({
      where: {
        isbn,
        enable,
      },
    });
  }

  async getAllBooks({
    search,
    searchType,
    filter,
    limit,
    page,
  }: ListBookDto): Promise<Type.FindAll.RepositoryType> {
    let whereBook: Prisma.BookWhereInput = {
      enable: true,
    };
    let includeBook: Prisma.BookInclude = {
      bookInstances: true,
    };

    // Search filters
    if (search && searchType) {
      if (searchType === 'genre') {
        whereBook = {
          ...whereBook,
          genre: search,
        };
      }

      if (searchType === 'isbn') {
        whereBook = {
          ...whereBook,
          isbn: search,
        };
      }

      if (searchType === 'name') {
        whereBook = {
          ...whereBook,
          title: search,
        };
      }

      if (searchType === 'type') {
        whereBook = {
          ...whereBook,
          type: search as 'fiction',
        };
      }
    }

    // Filter by availability
    if (filter) {
      if (filter === 'available') {
        whereBook = {
          ...whereBook,
          bookInstances: {
            some: {
              status: 'available',
            },
          },
        };
      }

      if (filter === 'unavailable') {
        whereBook = {
          ...whereBook,
          bookInstances: {
            every: {
              status: {
                in: ['rented', 'damaged'],
              },
            },
          },
        };
      }
    }
    // Pagination setup
    const skip = (page - 1) * limit; // Calculate how many records to skip

    // Count the total number of matching books
    const totalCount = await this.prisma.book.count({
      where: whereBook,
    });

    // Fetch the books with filtering, sorting, and pagination
    const books = await this.prisma.book.findMany({
      relationLoadStrategy: 'join',
      where: whereBook,
      include: includeBook,
      orderBy: {
        createdAt: 'desc', // Sort by creation date (newest first)
      },
      take: limit, // Limit of records to fetch
      skip: skip, // How many records to skip for pagination
    });

    return {
      books,
      totalCount, // Total count of matching records
      totalPages: Math.ceil(totalCount / limit), // Calculate total pages
      currentPage: page,
    };
  }

  async createBook(data: Prisma.BookCreateInput) {
    return this.prisma.book.create({
      data,
    });
  }

  async listBookInstances(ids: number[]): Promise<BookInstance[]> {
    return this.prisma.bookInstance.findMany({
      where: {
        bookId: {
          in: ids,
        },
      },
    });
  }

  // Other database functions for books
}
