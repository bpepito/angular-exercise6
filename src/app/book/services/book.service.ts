import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Book } from '../book';


@Injectable({
  providedIn: 'root'
})

export class BookService {
  serverUrl = 'http://localhost:3000/book';
  
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(this.serverUrl).pipe(
      tap(books => console.log('Fetched books:', books))
    );
  }

  getBookById(id:number) {
    const url = `${this.serverUrl}/${id}`;
    return this.http.get<Book>(url).pipe(
      tap(book => console.log(`Fetched book ${id}: `, book))
    );
  }

  updateBook(updatedBook: Book) {
    const url = `${this.serverUrl}/${updatedBook.id}`;
    return this.http.put<Book>(url, updatedBook).pipe(
      tap((book: Book) => console.log(`Updated book ${updatedBook.id} `, book))
    );
  }

  addBook(book: Book) {
    return this.http.post<Book>(this.serverUrl, book).pipe(
      tap((newBook: Book) => console.log('Adding a book ', newBook))
    );
  }

  deleteBook(id: number) {
    const url = `${this.serverUrl}/${id}`;
    return this.http.delete<Book>(url).pipe(
      tap(() => console.log(`Deleted book ${id}`))
    );
  }

  deleteAllBooks() {
    this.http.delete<void>(this.serverUrl).pipe(
      tap(() => console.log('Delete all books.'))
    );
  }

}
export { Book };

