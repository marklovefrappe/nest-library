import { Book, BookInstance } from '@prisma/client';

export namespace Create {
  export type RepositoryType =
    | (Book & { bookInstances?: BookInstance[] })
    | null;

  export type FormatType = {};

  export type ReturnType = {};
}

export namespace FindOne {
  export type RepositoryType = (BookInstance & { book: Book }) | null;

  export type FormatType = {
    bookInstance: BookInstance & { book: Book };
  };

  export type ReturnBook = {
    id: number;
    isbn: string;
    title: string;
    author: string;
    type: 'fiction' | 'non_fiction';
    genre: string;
  };

  export type ReturnType = {
    id: number;
    barcode: string;
    status: 'available' | 'rented' | 'damaged';
    condition: string;
    rented_out: boolean;
    due_date: string | null;
    location: string;
    book_detail: ReturnBook;
  };
}

export namespace FindAll {
  export type RepositoryType = {
    instances: (BookInstance & { book: Book })[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  };

  export type FormatType = RepositoryType;

  export type ReturnBook = {
    id: number;
    isbn: string;
    title: string;
    author: string;
    type: 'fiction' | 'non_fiction';
    genre: string;
  };

  export type ReturnBooks = {
    id: number;
    barcode: string;
    status: 'available' | 'rented' | 'damaged';
    condition: string;
    rented_out: boolean;
    due_date: string | null;
    location: string;
    book_detail: ReturnBook;
  }[];

  export type ReturnType = {
    instances: ReturnBooks;
    total_count: number;
    total_pages: number;
    current_page: number;
  };
}
