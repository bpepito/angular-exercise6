import { Component, OnInit } from '@angular/core';
import { Book, BookService } from '../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit{
  books:Book[] = [];

  constructor(private bookService:BookService) {}

  ngOnInit(): void {
    this.books = this.bookService.getBooks();
  }

  edit(id:number) {
    const updatedBook : Book = {
      id: id,
      name: (document.getElementById('name') as HTMLInputElement).value,
      author: (document.getElementById('author') as HTMLInputElement).value,
      isbn: (document.getElementById('isbn') as HTMLInputElement).value,
    }
    this.bookService.updateBook(updatedBook);
  }

  delete(id:number) {
    this.books = this.books.filter(b => b.id !== id);
  }

}
