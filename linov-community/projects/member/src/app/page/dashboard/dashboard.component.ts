import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GetAllEventDtoDataRes } from 'projects/core/src/app/dto/event/get-all-event-dto-data-res';
import { GetAllThreadLikeDtoDataRes } from 'projects/core/src/app/dto/thread-like/get-all-thread-like-dto-data-res';
import { GetThreadLikeByThreadDtoDataRes } from 'projects/core/src/app/dto/thread-like/get-thread-like-by-thread-dto-data-res';
import { InsertThreadLikeDtoReq } from 'projects/core/src/app/dto/thread-like/insert-thread-like-dto-req';
import { GetAllThreadDtoDataRes } from 'projects/core/src/app/dto/thread/get-all-thread-dto-data-res';
import { GetByThreadIdDtoDataRes } from 'projects/core/src/app/dto/thread/get-by-thread-id-dto-data-res';
import { BookmarkService } from 'projects/core/src/app/service/bookmark.service';
import { EventService } from 'projects/core/src/app/service/event.service';
import { ThreadLikeService } from 'projects/core/src/app/service/thread-like.service';
import { ThreadService } from 'projects/core/src/app/service/thread.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  threads: GetAllThreadDtoDataRes[] = []
  events: GetAllEventDtoDataRes[] = []
  courses: GetAllEventDtoDataRes[] = []
  insertThreadLikeDtoReq: InsertThreadLikeDtoReq = new InsertThreadLikeDtoReq()
  threadAllSubscription?: Subscription
  eventAllSubscription?: Subscription
  value: number = 0;

  responsiveOptions: any;
  isLikeClicked: boolean = false;
  isBookmarkClicked: boolean = false;
  isPollingClicked: boolean = false;

  constructor(private title: Title, private router: Router,
    private threadService: ThreadService, private threadLikeService: ThreadLikeService,
    private bookmarkService: BookmarkService, private eventService : EventService) {

    this.title.setTitle('Dashboard')
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.threadAllSubscription = this.threadService.getAll().subscribe(result => {
      this.threads = result.data
    })

    this.eventAllSubscription = this.eventService.getAll().subscribe(result => {
      this.events = result.data
    })
  }

  likeClicked(id: string): void {
    this.isLikeClicked = !this.isLikeClicked
    this.insertThreadLikeDtoReq.threadId = id
    if(this.isLikeClicked) {
      this.threadLikeService.insert(this.insertThreadLikeDtoReq).subscribe(_ => {
        this.initData()
      })
    }
  }

  bookmarkClicked(id: string): void {
    this.isBookmarkClicked = !this.isBookmarkClicked
  }

  pollingClicked(): void {
    this.isPollingClicked = !this.isPollingClicked
    this.initData()
    this.value = this.value + Math.floor(Math.random() * 10) + 1;
    if (this.value >= 100) {
      this.value = 100;
    }
  }

  ngOnDestroy(): void {

  }
}
