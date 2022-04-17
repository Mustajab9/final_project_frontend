import { CommonModule, DatePipe } from '@angular/common'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MessageService } from 'primeng/api'
import { ToastModule } from 'primeng/toast'

import { AppRouter } from './app.router'
import { AppComponent } from './app.component'
import { NavbarModule } from './page/navbar/navbar.module'
import { AppLoginModule } from '../../../login/src/app/app.module'
import { AppAdminModule } from '../../../admin/src/app/app.module'
import { ComponentModule } from '../../../core/src/app/component/components.module'
import { HttpHandlerLRC } from '../../../core/src/app/http/http-handler'
import { LoadingHandlerLRC } from '../../../core/src/app/http/loading-handler'

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
    AppRouter,
    ToastModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerLRC,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingHandlerLRC,
      multi: true
    },
    MessageService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
