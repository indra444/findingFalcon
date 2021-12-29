import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalObserver } from './modal.observer';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class ModalComponent implements OnInit {
  @Input() public header: string = '';
  @Input() public message: string = '';

  @ViewChild('content') content: any;
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private modalObserver: ModalObserver
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.modalObserver.open.subscribe((shouldOpen: boolean) => {
      if (shouldOpen) {
        this.modalService.open(this.content);
      }
    });
  }
}
