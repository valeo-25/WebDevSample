import { Injectable } from '@angular/core';

@Injectable()
export class WebcamService {

  private stream: MediaStream

  constructor() { }

  startWebcamStream(videoElem: any, callback: (errMsg:string) => any) {
    
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          this.stream = stream;
          videoElem.srcObject = stream;
          videoElem.play();
          callback("");
        })
        .catch(function (err) {
          callback(err.message);
        });
    }
  }

  stopWebcamStream() {
    if (this.stream) {
      this.stream.getVideoTracks()[0].stop();
    }
  }
}
