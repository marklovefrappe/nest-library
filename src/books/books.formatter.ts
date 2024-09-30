import { Injectable } from '@nestjs/common';
import * as Type from './books.type';

@Injectable()
export class BooksFormatter {
  formatfindAll({
    books: { books, currentPage, totalCount, totalPages },
  }: Type.FindAll.FormatType): Type.FindAll.ReturnType {
    return {
      books: books.map((book) => {
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

        return {
          id: book.id,
          isbn: book.isbn,
          title: book.title,
          author: book.author,
          type: book.type,
          genre: book.genre,
          status,
          context: `${availableInstances}/${totalInstances}`,
        };
      }),
      total_count: totalCount,
      current_page: currentPage,
      total_pages: totalPages,
    };
  }
}
