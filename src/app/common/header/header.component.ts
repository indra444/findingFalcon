import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Output() onReset: EventEmitter<boolean> = new EventEmitter();

  resetClick() {
    this.onReset.emit(true);
  }
}
