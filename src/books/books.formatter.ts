import { Injectable } from '@nestjs/common';
import * as Type from './books.type';

@Injectable()
export class BooksFormatter {
  getInstanceStatus({
    book,
  }: Type.Share.GetInstanceStatusParam): Type.Share.GetInstanceStatusReturn {
    const { bookInstances } = book;
    let status = 'unavailable';
    let totalInstances = 0;
    let availableInstances = 0;

    if (bookInstances?.length) {
      totalInstances = bookInstances.length;
      availableInstances = bookInstances.reduce(
        (count, instance) =>
          instance.status === 'available' ? count + 1 : count,
        0,
      );

      if (availableInstances > 0) {
        status = 'available';
      }
    }

    const context = `${availableInstances}/${totalInstances}`;

    return {
      status,
      context,
    };
  }

  formatfindAll({
    books: { books, currentPage, totalCount, totalPages },
  }: Type.FindAll.FormatType): Type.FindAll.ReturnType {
    return {
      books: books.map((book) => {
        const { status, context } = this.getInstanceStatus({ book });
        return {
          id: book.id,
          isbn: book.isbn,
          title: book.title,
          author: book.author,
          type: book.type,
          genre: book.genre,
          status,
          context,
        };
      }),
      total_count: totalCount,
      current_page: currentPage,
      total_pages: totalPages,
    };
  }

  formatfindOne({ book }: Type.FindOne.FormatType): Type.FindOne.ReturnType {
    const { status, context } = this.getInstanceStatus({ book });
    return {
      id: book.id,
      isbn: book.isbn,
      title: book.title,
      author: book.author,
      type: book.type,
      genre: book.genre,
      status,
      context,
      book_instance: book.bookInstances?.length
        ? book.bookInstances.map((bookInstance) => {
            return {
              id: bookInstance.id,
              barcode: bookInstance.barcode,
              status: bookInstance.status,
              condition: bookInstance.bookCondition,
              rented_out: bookInstance.rentedOut,
              due_date: bookInstance.dueDate
                ? bookInstance.dueDate.toISOString()
                : null,
              location: bookInstance.location,
            };
          })
        : null,
    };
  }
}
