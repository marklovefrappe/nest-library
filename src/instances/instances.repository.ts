import { Injectable } from '@nestjs/common';
import { Book, BookInstance, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as Type from './instances.type';
import { ListInstanceDto } from './dto/list-instance.dto';

@Injectable()
export class InstancesRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async getBookById(id: number): Promise<Type.Create.RepositoryType> {
    return this.prisma.book.findUnique({
      where: {
        id,
      },
      include: {
        bookInstances: true,
      },
    });
  }

  async listBookInstance({
    bookId,
    limit,
    page,
  }: ListInstanceDto): Promise<Type.FindAll.RepositoryType> {
    const skip = (page - 1) * limit;

    let whereCondition: Prisma.BookInstanceWhereInput = {};

    if (bookId) {
      whereCondition = {
        ...whereCondition,
        bookId,
      };
    }

    const totalCount = await this.prisma.bookInstance.count({
      where: whereCondition,
    });

    const instances = await this.prisma.bookInstance.findMany({
      where: whereCondition,
      include: {
        book: true,
      },
      take: limit,
      skip: skip,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    // Return the paginated response
    return {
      totalCount,
      currentPage: page,
      totalPages,
      instances, // Array of the book instances with joined book data
    };
  }

  async getBookInstanceById(id: number): Promise<Type.FindOne.RepositoryType> {
    return this.prisma.bookInstance.findUnique({
      where: {
        id,
      },
      include: {
        book: true,
      },
    });
  }

  async createBookInstance(data: Prisma.BookInstanceCreateInput) {
    return this.prisma.bookInstance.create({
      data,
    });
  }

  async updateBookInstance(id: number, data: Prisma.BookInstanceUpdateInput) {
    return this.prisma.bookInstance.update({
      where: {
        id,
      },
      data,
    });
  }
}
