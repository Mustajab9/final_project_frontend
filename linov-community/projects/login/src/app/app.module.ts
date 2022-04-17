import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { AppLoginRouter } from './app.router'
import { AppComponent } from './app.component'
import { ComponentModule } from '../../../core/src/app/component/components.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ComponentModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppLoginRouter,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppLoginModule { }
