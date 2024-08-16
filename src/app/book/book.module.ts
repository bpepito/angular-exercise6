import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
import { BookItemComponent } from './book-item/book-item.component';
import { BookRoutingModule } from './book-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BookFormComponent } from './pages/book-form/book-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BookListComponent,
    BookItemComponent,
    BookFormComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class BookModule { 
  
}
