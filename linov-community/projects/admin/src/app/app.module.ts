import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRouter } from './app.router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRouter,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
