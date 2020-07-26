import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-module-header',
  templateUrl: './module-header.component.html',
  styleUrls: ['./module-header.component.css']
})
export class ModuleHeaderComponent implements OnInit {
  @Input() title;
  @Input() nameButton;
  @Input() disabledButton = false;
  @Output() openDialog = new EventEmitter<any>();
  dateUpdate;
  constructor() {
    this.dateUpdate = new Date().toLocaleDateString('es', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  ngOnInit(): void {
  }

  openDialogCreate() {
    this.openDialog.emit(true);
  }
}
