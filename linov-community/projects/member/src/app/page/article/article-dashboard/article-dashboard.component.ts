import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GetAllEventDtoDataRes } from 'projects/core/src/app/dto/event/get-all-event-dto-data-res';
import { GetAllThreadDtoDataRes } from 'projects/core/src/app/dto/thread/get-all-thread-dto-data-res';
import { EventService } from 'projects/core/src/app/service/event.service';
import { LoginService } from 'projects/core/src/app/service/login.service';
import { ThreadService } from 'projects/core/src/app/service/thread.service';
import { Subscription, firstValueFrom } from 'rxjs'

@Component({
  selector: 'app-article-dashboard',
  templateUrl: './article-dashboard.component.html',
  styleUrls: ['./article-dashboard.component.css']
})
export class ArticleDashboardComponent implements OnInit {

  articles: GetAllThreadDtoDataRes[] = []
  events: GetAllEventDtoDataRes[] = []
  isLogin: boolean = this.loginService.isLogin()

  constructor(private title: Title, private router: Router,
    private threadService: ThreadService, private loginService: LoginService,
    private eventService: EventService) {
    this.title.setTitle('Article Dashboard')
  }

  ngOnInit(): void {
    this.initData()
  }

  async initData(): Promise<void> {
    if (this.isLogin) {
      const resultThreadAll = await firstValueFrom(this.threadService.getAll())
      this.articles = resultThreadAll.data.filter(comp => {
        comp.isReadMore = true
        return comp.typeCode == 'TY03'
      })

      const resultEventAll = await firstValueFrom(this.eventService.getAll())
      this.events = resultEventAll.data
    } else {
      const resultThreadAllNotLogin = await firstValueFrom(this.threadService.getAllNl())
      this.articles = resultThreadAllNotLogin.data.filter(comp => {
        comp.isReadMore = true
        return comp.typeCode == 'TY03'
      })

      const resultEventAllNotLogin = await firstValueFrom(this.eventService.getAllNl())
      this.events = resultEventAllNotLogin.data
    }
  }

  showText(index: number): void {
    this.articles[index].isReadMore = !this.articles[index].isReadMore
  }
}
