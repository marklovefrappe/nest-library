import { Book, BookInstance } from '@prisma/client';

export namespace FindAll {
  export type RepositoryType = {
    books: (Book & { bookInstances?: BookInstance[] })[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  };

  export type FormatType = {
    books: RepositoryType;
    // bookInstances: BookInstance[];
  };

  export type ReturnBook = {
    id: number;
    isbn: string;
    title: string;
    author: string;
    type: 'fiction' | 'non_fiction';
    genre: string;
    // status: 'available' | 'unavailable ';
    // context: string;
  };

  export type ReturnType = {
    books: ReturnBook[];
    total_count: number;
    total_pages: number;
    current_page: number;
  };
}
