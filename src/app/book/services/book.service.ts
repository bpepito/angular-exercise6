import { Injectable } from '@angular/core';

export interface Book {
  id: number;
  name: string;
  authors: string[];
  isbn: string;
}

@Injectable({
  providedIn: 'root'
})

export class BookService {
  books:Book[] = [
    {
      id: 1,
      name: 'The Five People You Meet in Heaven',
      authors: ['Mitch Albom'],
      isbn: '9780316726610'
    },
    {
      id: 2,
      name: 'Anxious People',
      authors: ['Fredrik Backman'],
      isbn: '9786555321111'
    },
    {
      id: 3,
      name: 'How Do You Live?',
      authors: ['Genzaburo Yoshino'],
      isbn: '9781643753072'
    },
  ]

  getBooks(): Book[] {
    return this.books;
  }

  getBookById(id:number): Book | undefined {
    return this.books.find(b => b.id === id);
  }

  updateBook(updatedBook:Book):void {
    const index = this.books.findIndex(b => b.id === updatedBook.id);
    this.books[index] = updatedBook;
  }
}
