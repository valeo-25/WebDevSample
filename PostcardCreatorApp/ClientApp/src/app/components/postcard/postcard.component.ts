import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { EmailPostcardService } from '../../services/email-postcard.service';
import { WebcamService } from '../../services/webcam.service';

import { EmailPostcardModel } from '../../models/email-postcard-model';
import { TextOptionsModel } from '../../models/text-options-model';

@Component({
  selector: 'app-postcard',
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.css']
})
export class PostcardComponent implements OnInit {

  @ViewChild("canvas")
  private canvas: ElementRef;

  private ctx: any;
  private postcardTextOptions: TextOptionsModel = new TextOptionsModel();
  private postcardImage: any;

  constructor(private emailPostcardService: EmailPostcardService, private webcamService: WebcamService) { }

  ngOnInit() {
    this.postcardImage = document.createElement("canvas");
    this.ctx = this.canvas.nativeElement.getContext("2d");
  }

  ngOnDestroy() {
    this.webcamService.stopWebcamStream();
  }

  captureWebcamImage(video: any) {
    this.clearPostcard();
    this.setPostcardImage(video, video.videoWidth, video.videoHeight);
    this.setPostcardText(this.postcardTextOptions);
  }

  sendPostcard(toEmail:string) {
    let imgUrl: string = this.canvas.nativeElement.toDataURL("image/png");

    let emailData: EmailPostcardModel = {
      toEmail: toEmail,
      image: imgUrl
    }

    this.emailPostcardService.emailPostcard(emailData);
  }

  updatePostcardText(options: TextOptionsModel) {
    this.clearPostcard();
    this.setPostcardImage(this.postcardImage, this.postcardImage.width, this.postcardImage.height);
    this.setPostcardText(options);
  }

  private clearPostcard() {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  private setPostcardImage(imageObj: any, width: number, height: number) {
    if (imageObj !== this.postcardImage) {
      this.postcardImage.width = width;
      this.postcardImage.height = height;
      let ctx = this.postcardImage.getContext("2d");
      ctx.drawImage(imageObj, 0, 0);
    }
    this.ctx.drawImage(this.postcardImage, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  private setPostcardText(options: TextOptionsModel) {
    if (options !== this.postcardTextOptions) {
      Object.assign(this.postcardTextOptions, options);
    }
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = options.color;
    this.ctx.fillText(options.text, options.posX, options.posY);
  }
}
