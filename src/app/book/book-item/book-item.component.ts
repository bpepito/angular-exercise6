import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../services/book.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css'
})
export class BookItemComponent {
  @Input(`book`) book!:Book;

  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  isVisible = false;

  onEdit(): void {
    this.edit.emit(this.book.id);
  }

  onDelete(): void {
    this.delete.emit(this.book.id);
  }

  toggleVisibility = () => {
    this.isVisible = !this.isVisible;
  }
}
