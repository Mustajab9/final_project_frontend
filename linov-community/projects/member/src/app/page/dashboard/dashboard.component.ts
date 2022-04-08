import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { InsertBookmarkDtoReq } from 'projects/core/src/app/dto/bookmark/insert-bookmark-dto-req';
import { InsertChoiceVoteDtoReq } from 'projects/core/src/app/dto/choice-vote/insert-choice-vote-dto-req';
import { GetAllEventDtoDataRes } from 'projects/core/src/app/dto/event/get-all-event-dto-data-res';
import { InsertThreadLikeDtoReq } from 'projects/core/src/app/dto/thread-like/insert-thread-like-dto-req';
import { GetAllThreadDtoDataRes } from 'projects/core/src/app/dto/thread/get-all-thread-dto-data-res';
import { BookmarkService } from 'projects/core/src/app/service/bookmark.service';
import { ChoiceVoteService } from 'projects/core/src/app/service/choice-vote.service';
import { EventService } from 'projects/core/src/app/service/event.service';
import { LoginService } from 'projects/core/src/app/service/login.service';
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
  insertThreadLikeDtoReq: InsertThreadLikeDtoReq = new InsertThreadLikeDtoReq()
  insertBookmarkDtoReq: InsertBookmarkDtoReq = new InsertBookmarkDtoReq()
  insertChoiceVoteDtoReq: InsertChoiceVoteDtoReq = new InsertChoiceVoteDtoReq()
  threadAllSubscription?: Subscription
  eventAllSubscription?: Subscription
  getThreadLikeByThreadAndUserSubscription?: Subscription
  threadLikeInsertSubscription?: Subscription
  threadLikeDeleteSubscription?: Subscription
  getBookmarkByThreadAndUserSubscription?: Subscription
  bookmarkInsertSubscription?: Subscription
  bookmarkDeleteSubscription?: Subscription
  choiceVoteInsertSubscription?: Subscription

  value: number = 0;
  responsiveOptions: any;
  isPollingClicked: boolean = false;

  constructor(private title: Title, private router: Router,
    private threadService: ThreadService, private threadLikeService: ThreadLikeService,
    private bookmarkService: BookmarkService, private eventService: EventService,
    private choiceVoteService: ChoiceVoteService, private loginService: LoginService) {

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
      console.log(result.data)
    })

    this.eventAllSubscription = this.eventService.getAll().subscribe(result => {
      this.events = result.data
    })
  }

  onLike(id: string, isLike: boolean): void {
    this.insertThreadLikeDtoReq.threadId = id
    if (isLike == false) {
      isLike = !isLike
      this.threadLikeInsertSubscription = this.threadLikeService.insert(this.insertThreadLikeDtoReq).subscribe(_ => {
        this.initData()
      })
    } else if (isLike == true) {
      const userId: string | undefined = this.loginService.getData()?.data.id
      isLike = !isLike
      this.getThreadLikeByThreadAndUserSubscription = this.threadLikeService.getByThreadAndUser(id, userId).subscribe(result => {
        if (result) {
          this.threadLikeDeleteSubscription = this.threadLikeService.delete(result.data.id).subscribe(_ => {
            this.initData()
          })
        }
      })
    }
  }

  onBookmark(id: string, isBookmarked: boolean): void {
    this.insertBookmarkDtoReq.threadId = id
    if (isBookmarked == false) {
      isBookmarked = !isBookmarked
      this.bookmarkInsertSubscription = this.bookmarkService.insert(this.insertBookmarkDtoReq).subscribe(_ => {
        this.initData()
      })
    } else if (isBookmarked == true) {
      const userId: string | undefined = this.loginService.getData()?.data.id
      isBookmarked = !isBookmarked
      this.getBookmarkByThreadAndUserSubscription = this.bookmarkService.getByUserAndThread(id, userId).subscribe(result => {
        if (result) {
          this.bookmarkDeleteSubscription = this.bookmarkService.delete(result.data.id).subscribe(_ => {
            this.initData()
          })
        }
      })
    }
  }

  onPolling(): void {
    this.isPollingClicked = !this.isPollingClicked
    this.initData()
    this.value = this.value + Math.floor(Math.random() * 10) + 1;
    if (this.value >= 100) {
      this.value = 100;
    }
  }

  ngOnDestroy(): void {
    this.threadAllSubscription?.unsubscribe()
    this.eventAllSubscription?.unsubscribe()
    this.getThreadLikeByThreadAndUserSubscription?.unsubscribe()
    this.threadLikeInsertSubscription?.unsubscribe()
    this.threadLikeDeleteSubscription?.unsubscribe()
    this.getBookmarkByThreadAndUserSubscription?.unsubscribe()
    this.bookmarkInsertSubscription?.unsubscribe()
    this.bookmarkDeleteSubscription?.unsubscribe()
    this.choiceVoteInsertSubscription?.unsubscribe()
  }
}
