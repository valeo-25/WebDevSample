import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { PostcardComponent } from './components/postcard/postcard.component';
import { PostcardEditorComponent } from './pages/postcard-editor/postcard-editor.component';
import { EmailPostcardService } from './services/email-postcard.service';
import { ModalComponent } from './components/modal/modal.component';
import { WebcamService } from './services/webcam.service';
import { TextEditComponent } from './components/text-edit/text-edit.component';
import { WebcamCaptureComponent } from './components/webcam-capture/webcam-capture.component';
import { AboutComponent } from './pages/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    PostcardComponent,
    PostcardEditorComponent,
    ModalComponent,
    TextEditComponent,
    WebcamCaptureComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: PostcardEditorComponent, pathMatch: 'full' },
      { path: 'about', component: AboutComponent }
    ])
  ],
  providers: [
    EmailPostcardService,
    WebcamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
