import { Book, BookInstance } from '@prisma/client';

export namespace Share {
  export type GetInstanceStatusParam = {
    book: Book & { bookInstances?: BookInstance[] };
  };
  export type GetInstanceStatusReturn = {
    status: string;
    context: string;
  };
}

export namespace FindAll {
  export type RepositoryType = {
    books: (Book & { bookInstances?: BookInstance[] })[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  };

  export type FormatType = {
    books: RepositoryType;
  };

  export type Books = {
    id: number;
    isbn: string;
    title: string;
    author: string;
    type: 'fiction' | 'non_fiction';
    genre: string;
    status: string;
    context: string;
  }[];

  export type ReturnType = {
    books: Books;
    total_count: number;
    total_pages: number;
    current_page: number;
  };
}

export namespace FindOne {
  export type RepositoryType =
    | (Book & { bookInstances?: BookInstance[] })
    | null;

  export type FormatType = {
    book: Book & { bookInstances?: BookInstance[] };
  };

  export type Instance = {
    id: number;
    barcode: string;
    status: 'available' | 'rented' | 'damaged';
    condition: string;
    rented_out: boolean;
    due_date: string | null;
    location: string;
  };

  export type ReturnType = {
    id: number;
    isbn: string;
    title: string;
    author: string;
    type: 'fiction' | 'non_fiction';
    genre: string;
    status: string;
    context: string;
    book_instance: Instance[] | null;
  };
}
