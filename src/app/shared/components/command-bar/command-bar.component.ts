import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-command-bar',
  templateUrl: './command-bar.component.html',
  styleUrl: './command-bar.component.css'
})
export class CommandBarComponent {
  @Output() actionEmitter = new EventEmitter<string>();

  onAdd() {
    this.actionEmitter.emit('add');
  }

  onDeleteAll() {
    this.actionEmitter.emit('deleteAll');
  }
}
