import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { PostcardComponent } from '../../components/postcard/postcard.component';
import { ModalComponent } from '../../components/modal/modal.component';

import { TextOptionsModel } from '../../models/text-options-model';

@Component({
  selector: 'app-postcard-editor',
  templateUrl: './postcard-editor.component.html',
  styleUrls: ['./postcard-editor.component.css']
})
export class PostcardEditorComponent implements OnInit {

  @ViewChild("postcard")
  private postcard: PostcardComponent;

  @ViewChild("modal")
  private modal: ModalComponent;

  @ViewChild("modalinfo")
  private modalInfo: ElementRef;

  private postcardText: string;
  private toEmail: string;

  constructor() { }

  ngOnInit() {
    this.modalInfo.nativeElement.style.display = "none";
  }

  sendPostcard() {
    this.postcard.sendPostcard(this.toEmail);
    this.modalInfo.nativeElement.style.display = "block";
    setTimeout(() => { this.modalInfo.nativeElement.style.display = "none"; }, 5000);
  }
  
  postcardTextUpdated(options: TextOptionsModel) {
    this.postcard.updatePostcardText(options);
  }

  captureWebcamImage(video: any) {
    this.postcard.captureWebcamImage(video);
  }

  openModal() {
    this.modal.open();
  }

  closeModal() {
    this.modal.close();
  }

}
