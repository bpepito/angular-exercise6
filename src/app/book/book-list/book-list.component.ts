import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../book';
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
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks()
      .subscribe((books: Book[]) => this.books = books);
  }

  edit(id: number): void {
    this.router.navigate([`/book/form`, id]);
  }

  delete(id: number): void {
    this.bookService.deleteBook(id)
      .subscribe(() => console.log(this.loadBooks()));
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

