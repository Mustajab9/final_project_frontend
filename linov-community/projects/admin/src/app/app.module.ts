import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppAdminModule { }
