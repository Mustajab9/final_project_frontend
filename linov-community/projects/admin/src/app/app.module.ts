import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { HttpHandlerElearning } from '../../../core/src/app/http/http-handler';
import { AppComponent } from './app.component';
import { AppAdminRouter } from './app.router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppAdminRouter,
    FormsModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpHandlerElearning,
    multi: true
    },
    MessageService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppAdminModule { }
