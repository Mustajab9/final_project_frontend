import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GetAllEventDtoDataRes } from 'projects/core/src/app/dto/event/get-all-event-dto-data-res';
import { GetAllThreadDtoDataRes } from 'projects/core/src/app/dto/thread/get-all-thread-dto-data-res';
import { EventService } from 'projects/core/src/app/service/event.service';
import { LoginService } from 'projects/core/src/app/service/login.service';
import { ThreadService } from 'projects/core/src/app/service/thread.service';

@Component({
  selector: 'app-article-dashboard',
  templateUrl: './article-dashboard.component.html',
  styleUrls: ['./article-dashboard.component.css']
})
export class ArticleDashboardComponent implements OnInit {

  articles: GetAllThreadDtoDataRes[] = []
  events: GetAllEventDtoDataRes[] = []

  constructor(private title: Title, private router: Router,
    private threadService: ThreadService, private loginService: LoginService,
    private eventService: EventService) { 
      this.title.setTitle('Article Dashboard')
    }

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.threadService.getAll().subscribe(result => {
      this.articles = result.data.filter(comp => {
        comp.isReadMore = true
        return comp.typeCode == 'TY03'
      })
    })

    this.eventService.getAll().subscribe(result => {
      this.events = result.data
    })
  }

  showText(index: number): void {
    this.articles[index].isReadMore = !this.articles[index].isReadMore
  }
}
