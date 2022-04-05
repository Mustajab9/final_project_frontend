import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppAdminModule } from 'projects/admin/src/app/app.module';
import { ComponentModule } from '../../../core/src/app/component/components.module';
import { AppLoginModule } from 'projects/login/src/app/app.module';
import { AppComponent } from './app.component';
import { AppRouter } from './app.router';
import { NavbarModule } from './page/navbar/navbar.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHandlerElearning } from 'projects/core/src/app/http/http-handler';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ComponentModule,
    CommonModule,
    FormsModule,
    NavbarModule,
    AppAdminModule,
    AppLoginModule,
    AppRouter
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
export class AppModule { }
