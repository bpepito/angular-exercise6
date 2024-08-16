import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Blog } from '../blog';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrl: './blog-item.component.css'
})
export class BlogItemComponent {
  @Input(`blog`) blog!:Blog;

  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onEdit() {
    this.edit.emit(this.blog.id);
  }

  onDelete() {
    this.delete.emit(this.blog.id);
  }
}
