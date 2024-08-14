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
    const authorsText = (document.getElementById('authors') as HTMLTextAreaElement).value;
    const authorsArray = authorsText.split('\n').map(author => author.trim()).filter(author => author !== '');
    const updatedBook : Book = {
      id: id,
      name: (document.getElementById('name') as HTMLInputElement).value,
      authors: authorsArray,
      isbn: (document.getElementById('isbn') as HTMLInputElement).value,
    }
    this.bookService.updateBook(updatedBook);
  }

  delete(id:number) {
    this.books = this.books.filter(b => b.id !== id);
  }
}
