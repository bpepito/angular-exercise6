import { Component, OnInit } from '@angular/core';
import { Book, BookService } from '../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.books = this.bookService.getBooks();
  }

  edit(id: number): void {
    this.router.navigate([`/book/form`, id]);
  }

  delete(id: number): void {
    this.bookService.deleteBook(id);
    this.books = this.bookService.getBooks();
  }

  handleCommand(action: string): void {
    if (action === 'add') {
      this.router.navigate(['/book/form']);
    } else if (action === 'deleteAll') {
      this.bookService.deleteAllBooks();
      this.books = [];
    }
  }
}

