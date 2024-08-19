import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../book';


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
      const book = this.bookService.getBookById(this.bookId).subscribe({
        next: (book: Book) => {
          this.bookForm.patchValue({
              name: book.name,
              isbn: book.isbn
            });
            const authors = this.bookForm.get('authors') as FormArray;
            book.authors.forEach(author => authors.push(this.fb.control(author, Validators.required)));
        }}
      );
    }
  }

  get authors(): FormArray {
    return this.bookForm.get('authors') as FormArray;
  }

  addAuthor(): void {
    this.authors.push(this.fb.control('', Validators.required));
  }

  removeAuthor(index: number): void {
    if(this.authors.length > 1)
      this.authors.removeAt(index);
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const formValue = this.bookForm.value;
      const book: Book = {
        id: this.bookId as number,
        name: formValue.name,
        authors: formValue.authors,
        isbn: formValue.isbn
      };
      
      const request = this.bookId
        ? this.bookService.updateBook(book)
        : this.bookService.addBook(book);
      
      request.subscribe({
        next: () => {
          this.router.navigate(['/book']);
        }
      })
    }
  }
}