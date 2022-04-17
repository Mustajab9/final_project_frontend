import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { Subscription, firstValueFrom } from 'rxjs'
import { ConfirmationService } from 'primeng/api'

import { InsertBookmarkDtoReq } from '../../../../../core/src/app/dto/bookmark/insert-bookmark-dto-req'
import { GetAllCategoryDtoDataRes } from '../../../../../core/src/app/dto/category/get-all-category-dto-data-res'
import { InsertChoiceVoteDtoReq } from '../../../../../core/src/app/dto/choice-vote/insert-choice-vote-dto-req'
import { GetAllEventDtoDataRes } from '../../../../../core/src/app/dto/event/get-all-event-dto-data-res'
import { GetAllEventDtoRes } from '../../../../../core/src/app/dto/event/get-all-event-dto-res'
import { InsertThreadLikeDtoReq } from '../../../../../core/src/app/dto/thread-like/insert-thread-like-dto-req'
import { GetAllThreadDtoDataRes } from '../../../../../core/src/app/dto/thread/get-all-thread-dto-data-res'
import { GetAllThreadDtoRes } from '../../../../../core/src/app/dto/thread/get-all-thread-dto-res'
import { BookmarkService } from '../../../../../core/src/app/service/bookmark.service'
import { CategoryService } from '../../../../../core/src/app/service/category.service'
import { ChoiceVoteService } from '../../../../../core/src/app/service/choice-vote.service'
import { EventService } from '../../../../../core/src/app/service/event.service'
import { LoadingService } from '../../../../../core/src/app/service/loading.service'
import { LoginService } from '../../../../../core/src/app/service/login.service'
import { ThreadLikeService } from '../../../../../core/src/app/service/thread-like.service'
import { ThreadService } from '../../../../../core/src/app/service/thread.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  threads: GetAllThreadDtoDataRes[] = []
  events: GetAllEventDtoDataRes[] = []
  categories: GetAllCategoryDtoDataRes[] = []
  selectedCategory: GetAllCategoryDtoDataRes[] = []
  insertThreadLikeDtoReq: InsertThreadLikeDtoReq = new InsertThreadLikeDtoReq()
  insertBookmarkDtoReq: InsertBookmarkDtoReq = new InsertBookmarkDtoReq()
  insertChoiceVoteDtoReq: InsertChoiceVoteDtoReq = new InsertChoiceVoteDtoReq()
  loadingSubscription?: Subscription

  value: number = 0
  responsiveOptions: any
  isPollingClicked: boolean = false
  initialPage: number = 0
  maxPage: number = 10
  isLoading: boolean = false
  categoryId: string[] = []
  roleCode = this.loginService.getData()?.data.roleCode

  isLogin: boolean = this.loginService.isLogin()
  blockedPanel: boolean = false

  constructor(private title: Title, private router: Router,
    private threadService: ThreadService, private threadLikeService: ThreadLikeService,
    private bookmarkService: BookmarkService, private eventService: EventService,
    private choiceVoteService: ChoiceVoteService, private loginService: LoginService,
    private confirmationService: ConfirmationService, private loadingService: LoadingService,
    private categoryService: CategoryService) {

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
    ]
  }

  ngOnInit(): void {
    this.initData()
  }

  async initData(): Promise<void> {
    this.loadingSubscription = this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })

    let resultAllThread: GetAllThreadDtoRes
    let resultAllEvent: GetAllEventDtoRes
    if (this.isLogin) {
      resultAllThread = await firstValueFrom(this.threadService.getAll(this.initialPage, this.maxPage))
      resultAllEvent = await firstValueFrom(this.eventService.getAll())

    } else {
      resultAllThread = await firstValueFrom(this.threadService.getAllNl(this.initialPage, this.maxPage))
      resultAllEvent = await firstValueFrom(this.eventService.getAllNl())
    }

    this.threads = resultAllThread.data.filter(comp => {
      comp.isReadMore = true
      this.categoryId = comp.categoryId
      return comp.typeCode == 'TY01' || comp.typeCode == 'TY02'
    })

    this.events = resultAllEvent.data.slice(0, 2)

    const resultAllCategory = await firstValueFrom(this.categoryService.getAll())
    this.categories = resultAllCategory.data
  }

  showText(id: string): void {
    this.router.navigateByUrl(`/member/thread/detail/${id}`)
  }

  async onCategory(id: string[]) {
    let resultAllThreadByCategory: GetAllThreadDtoRes
    if (this.isLogin) {
      resultAllThreadByCategory = await firstValueFrom(this.threadService.getByCategory(id))
    } else {
      resultAllThreadByCategory = await firstValueFrom(this.threadService.getByCategoryNl(id))
    }

    this.threads = resultAllThreadByCategory.data
  }

  async onLike(id: string, isLike: boolean): Promise<void> {
    if (this.isLogin) {
      this.insertThreadLikeDtoReq.threadId = id

      if (!isLike) {
        await firstValueFrom(this.threadLikeService.insert(this.insertThreadLikeDtoReq))
        this.initialPage = 0
        this.initData()

      } else if (isLike) {
        const userId: string | undefined = this.loginService.getData()?.data.id
        const resultByThreadAndUser = await firstValueFrom(this.threadLikeService.getByThreadAndUser(id, userId))

        if (resultByThreadAndUser) {
          await firstValueFrom(this.threadLikeService.delete(resultByThreadAndUser.data.id))
          this.initialPage = 0
          this.initData()
        }
      }
    } else {
      this.confirmationService.confirm({
        message: 'You Must Be Login First',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.router.navigateByUrl('/login/member')
        }
      })
    }
  }

  async onBookmark(id: string, isBookmarked: boolean): Promise<void> {
    if (this.isLogin) {
      this.insertBookmarkDtoReq.threadId = id

      if (!isBookmarked) {
        await firstValueFrom(this.bookmarkService.insert(this.insertBookmarkDtoReq))
        this.initialPage = 0
        this.initData()

      } else if (isBookmarked) {
        const userId: string | undefined = this.loginService.getData()?.data.id
        const resultByThreadAndUser = await firstValueFrom(this.bookmarkService.getByUserAndThread(id, userId))
        if (resultByThreadAndUser) {
          await firstValueFrom(this.bookmarkService.delete(resultByThreadAndUser.data.id))
          this.initialPage = 0
          this.initData()
        }
      }
    } else {
      this.confirmationService.confirm({
        message: 'You Must Be Login First',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.router.navigateByUrl('/login/member')
        }
      })
    }
  }

  onComment(id: string) {
    if (this.isLogin) {
      this.router.navigateByUrl(`/member/thread/detail/${id}`)
    } else {
      this.confirmationService.confirm({
        message: 'You Must Be Login First',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.router.navigateByUrl('/login/member')
        }
      })
    }
  }

  async onPolling(id: string, isVoted: boolean): Promise<void> {
    if (this.isLogin) {
      this.insertChoiceVoteDtoReq.choiceId = id
      if (!isVoted) {
        await firstValueFrom(this.choiceVoteService.insert(this.insertChoiceVoteDtoReq))
        this.initialPage = 0
        this.initData()
      }
    } else {
      this.confirmationService.confirm({
        message: 'You Must Be Login First',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.router.navigateByUrl('/login/member')
        }
      })
    }
  }

  async onScroll(): Promise<void> {
    let resultAllThread: GetAllThreadDtoRes
    if (this.isLogin) {
      this.initialPage = this.initialPage + 10
      resultAllThread = await firstValueFrom(this.threadService.getAll(this.initialPage, this.maxPage))
    } else {
      this.initialPage = this.initialPage + 10
      resultAllThread = await firstValueFrom(this.threadService.getAllNl(this.initialPage, this.maxPage))
    }

    this.threads = [...this.threads, ...resultAllThread.data.filter(comp => comp.typeCode == 'TY01' || comp.typeCode == 'TY02')]
  }

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe()
  }
}
