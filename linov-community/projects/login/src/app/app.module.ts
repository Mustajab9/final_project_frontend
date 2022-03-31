import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { AppLoginRouter } from './app.router';
import { ComponentModule } from '../../../core/src/app/component/components.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ComponentModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppLoginRouter
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppLoginModule { }
