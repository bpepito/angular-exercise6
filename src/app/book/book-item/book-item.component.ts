import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../book';


@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css'
})
export class BookItemComponent{
  @Input(`book`) book!:Book;

  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onEdit() {
    this.edit.emit(this.book.id);
  }

  onDelete() {
    this.delete.emit(this.book.id);
  }

}
