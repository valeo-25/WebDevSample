import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { WebcamService } from '../../services/webcam.service';

@Component({
  selector: 'app-webcam-capture',
  templateUrl: './webcam-capture.component.html',
  styleUrls: ['./webcam-capture.component.css']
})
export class WebcamCaptureComponent implements OnInit {

  @ViewChild("video")
  private video: ElementRef;

  @ViewChild("alert")
  private alert: ElementRef;

  @Output() imageCaptured = new EventEmitter();

  private static readonly ACTIVATE_CAM_TXT_ACTIVATE = "Activate Webcam";
  private static readonly ACTIVATE_CAM_TXT_DEACTIVATE = "Deactivate Webcam";

  private webcamActive: boolean = false;
  private activateWebcamBtnText: string = WebcamCaptureComponent.ACTIVATE_CAM_TXT_ACTIVATE;
  private alertText: string = "";
  
  constructor(private webcamService: WebcamService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.alert.nativeElement.style.display = "none";
  }

  ngOnDestroy() {
    this.webcamService.stopWebcamStream();
  }

  captureImage() {
    this.imageCaptured.emit(this.video.nativeElement);
  }

  toggleWebcam() {
    if (!this.webcamActive) {
      this.webcamService.startWebcamStream(this.video.nativeElement, (errMsg: string) => {
        if (errMsg.length === 0) {
          this.activateWebcamBtnText = WebcamCaptureComponent.ACTIVATE_CAM_TXT_DEACTIVATE;
          this.webcamActive = true;
          this.alertText = "";
          this.alert.nativeElement.style.display = "none";
        } else {
          this.alertText = errMsg;
          this.alert.nativeElement.style.display = "block";
        }
      });
    } else {
      this.activateWebcamBtnText = WebcamCaptureComponent.ACTIVATE_CAM_TXT_ACTIVATE;
      this.webcamService.stopWebcamStream();
      this.webcamActive = false;
    }

  }
}
