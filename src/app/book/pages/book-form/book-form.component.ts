import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Book, BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  bookId?: number;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      name: new FormControl('', Validators.required),
      authors: this.fb.array([this.fb.control('', Validators.required)]),
      isbn: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.bookId) {
      const book = this.bookService.getBookById(this.bookId);
      if (book) {
        this.bookForm.patchValue({
          name: book.name,
          isbn: book.isbn
        });
        const authors = this.bookForm.get('authors') as FormArray;
        book.authors.forEach(author => authors.push(this.fb.control(author, Validators.required)));
      }
    }
  }

  get authors(): FormArray {
    return this.bookForm.get('authors') as FormArray;
  }

  addAuthor(): void {
    this.authors.push(this.fb.control('', Validators.required));
  }

  removeAuthor(index: number): void {
    this.authors.removeAt(index);
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const formValue = this.bookForm.value;
      const book: Book = {
        id: this.bookId ?? this.bookService.getBookCount() + 1,
        name: formValue.name,
        authors: formValue.authors,
        isbn: formValue.isbn
      };

      if (this.bookId) {
        this.bookService.updateBook(book);
      } else {
        this.bookService.addBook(book);
      }
      this.router.navigate(['/book']);
    }
  }
}