import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: '<ng-content></ng-content>',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  private element: any;

  constructor(private el: ElementRef) {
    this.element = this.el.nativeElement;
  }

  ngOnInit() {
    document.body.appendChild(this.element);

    this.element.addEventListener('click', function (e: any) {
      if (e.target.className === 'modal') {
        this.close();
      }
    });
  }

  ngOnDestroy() {
    this.element.remove();
  }

  open() {
    this.element.style.display = "block";
  }

  close() {
    this.element.style.display = "none";
  }

}
