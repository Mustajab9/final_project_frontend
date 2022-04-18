import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { GetAllThreadDtoRes } from 'projects/core/src/app/dto/thread/get-all-thread-dto-res'
import { Subscription, firstValueFrom } from 'rxjs'

import { GetAllEventDtoDataRes } from '../../../../../../core/src/app/dto/event/get-all-event-dto-data-res'
import { GetAllThreadDtoDataRes } from '../../../../../../core/src/app/dto/thread/get-all-thread-dto-data-res'
import { EventService } from '../../../../../../core/src/app/service/event.service'
import { LoginService } from '../../../../../../core/src/app/service/login.service'
import { ThreadService } from '../../../../../../core/src/app/service/thread.service'

@Component({
  selector: 'app-article-dashboard',
  templateUrl: './article-dashboard.component.html',
  styleUrls: ['./article-dashboard.component.css']
})
export class ArticleDashboardComponent implements OnInit {

  articles: GetAllThreadDtoDataRes[] = []
  events: GetAllEventDtoDataRes[] = []
  isLogin: boolean = this.loginService.isLogin()
  initialPage: number = 0
  maxPage: number = 10

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

  async onScroll(): Promise<void> {
    let resultAllArticle: GetAllThreadDtoRes
    if (this.isLogin) {
      this.initialPage = this.initialPage + 10
      resultAllArticle = await firstValueFrom(this.threadService.getAll(this.initialPage, this.maxPage))
    } else {
      this.initialPage = this.initialPage + 10
      resultAllArticle = await firstValueFrom(this.threadService.getAllNl(this.initialPage, this.maxPage))
    }

    this.articles = [...this.articles, ...resultAllArticle.data.filter(comp => comp.typeCode == 'TY01' || comp.typeCode == 'TY02')]
  }
}
