import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EmailPostcardModel } from '../models/email-postcard-model';

@Injectable()
export class EmailPostcardService {

  private http: HttpClient;
  private baseUrl: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  emailPostcard(emailPostcardModel: EmailPostcardModel) {

    let postResult;

    this.http.post(this.baseUrl + 'api/Email/MailPostcard', emailPostcardModel).subscribe(result => {
      postResult = result;
    }, error => console.error(error));

    console.log(postResult);
  }
}
