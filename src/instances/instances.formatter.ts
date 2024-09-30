import { Injectable } from '@nestjs/common';
import * as Type from './instances.type';

@Injectable()
export class InstancesFormatter {
  formatFindOne({
    bookInstance,
  }: Type.FindOne.FormatType): Type.FindOne.ReturnType {
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
      book_detail: {
        id: bookInstance.book.id,
        isbn: bookInstance.book.isbn,
        title: bookInstance.book.title,
        author: bookInstance.book.author,
        type: bookInstance.book.type,
        genre: bookInstance.book.genre,
      },
    };
  }

  formatFindAll({
    instances: bookInstances,
    currentPage,
    totalCount,
    totalPages,
  }: Type.FindAll.FormatType): Type.FindAll.ReturnType {
    return {
      instances: bookInstances.map((bookInstance) => {
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
          book_detail: {
            id: bookInstance.book.id,
            isbn: bookInstance.book.isbn,
            title: bookInstance.book.title,
            author: bookInstance.book.author,
            type: bookInstance.book.type,
            genre: bookInstance.book.genre,
          },
        };
      }),
      total_count: totalCount,
      total_pages: totalPages,
      current_page: currentPage,
    };
  }
}
