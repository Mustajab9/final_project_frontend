import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentModule } from '../../../core/src/app/component/components.module';
import { AppComponent } from './app.component';
import { AppAdminRouter } from './app.router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ComponentModule,
    AppAdminRouter,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppAdminModule { }
