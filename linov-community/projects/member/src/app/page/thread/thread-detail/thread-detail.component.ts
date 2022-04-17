import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'

import { firstValueFrom, Subscription } from 'rxjs'
import { ConfirmationService } from 'primeng/api'

import { InsertBookmarkDtoReq } from '../../../../../../core/src/app/dto/bookmark/insert-bookmark-dto-req'
import { InsertChoiceVoteDtoReq } from '../../../../../../core/src/app/dto/choice-vote/insert-choice-vote-dto-req'
import { GetThreadCommentByThreadDtoDataRes } from '../../../../../../core/src/app/dto/thread-comment/get-thread-comment-by-thread-dto-data-res'
import { InsertThreadCommentDtoReq } from '../../../../../../core/src/app/dto/thread-comment/insert-thread-comment-dto-req'
import { InsertThreadLikeDtoReq } from '../../../../../../core/src/app/dto/thread-like/insert-thread-like-dto-req'
import { GetAllThreadDtoDataRes } from '../../../../../../core/src/app/dto/thread/get-all-thread-dto-data-res'
import { GetByThreadIdDtoDataRes } from '../../../../../../core/src/app/dto/thread/get-by-thread-id-dto-data-res'
import { BookmarkService } from '../../../../../../core/src/app/service/bookmark.service'
import { ChoiceVoteService } from '../../../../../../core/src/app/service/choice-vote.service'
import { LoadingService } from '../../../../../../core/src/app/service/loading.service'
import { LoginService } from '../../../../../../core/src/app/service/login.service'
import { ThreadCommentService } from '../../../../../../core/src/app/service/thread-comment.service'
import { ThreadLikeService } from '../../../../../../core/src/app/service/thread-like.service'
import { ThreadService } from '../../../../../../core/src/app/service/thread.service'

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.css']
})
export class ThreadDetailComponent implements OnInit, OnDestroy {

  threadById: GetByThreadIdDtoDataRes = new GetByThreadIdDtoDataRes()
  threadCommentsByThread: GetThreadCommentByThreadDtoDataRes[] = []
  threadByCategory: GetAllThreadDtoDataRes[] = []

  insertThreadComment: InsertThreadCommentDtoReq = new InsertThreadCommentDtoReq()
  insertThreadLikeDtoReq: InsertThreadLikeDtoReq = new InsertThreadLikeDtoReq()
  insertBookmarkDtoReq: InsertBookmarkDtoReq = new InsertBookmarkDtoReq()
  insertChoiceVoteDtoReq: InsertChoiceVoteDtoReq = new InsertChoiceVoteDtoReq()
  loadingSubscription?: Subscription

  value: number = 0
  responsiveOptions: any
  isLogin: boolean = this.loginService.isLogin()
  isLoading: boolean = false

  constructor(private title: Title, private router: Router, private loadingService: LoadingService,
    private threadService: ThreadService, private threadLikeService: ThreadLikeService,
    private bookmarkService: BookmarkService, private choiceVoteService: ChoiceVoteService,
    private loginService: LoginService, private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService, private threadCommentService: ThreadCommentService) {

    this.title.setTitle('Thread Detail')
  }

  async ngOnInit() {
    this.loadingSubscription = this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })

    const { id } = await firstValueFrom(this.activatedRoute.params)
    this.initData(id)
  }

  async initData(id: string): Promise<void> {
    const resultThreadById = await firstValueFrom(this.threadService.getById(id))
    this.threadById = resultThreadById.data

    const resultThreadByCategory = await firstValueFrom(this.threadService.getByCategory(resultThreadById.data.categoryId))
    this.threadByCategory = resultThreadByCategory.data

    const resultThreadCommentByThreadId = await firstValueFrom(this.threadCommentService.getByThread(id))
    this.threadCommentsByThread = resultThreadCommentByThreadId.data
  }

  async onLike(id: string, isLike: boolean): Promise<void> {
    if (this.isLogin) {
      this.insertThreadLikeDtoReq.threadId = id

      if (!isLike) {
        await firstValueFrom(this.threadLikeService.insert(this.insertThreadLikeDtoReq))
        this.initData(this.threadById.id)

      } else if (isLike) {
        const userId: string | undefined = this.loginService.getData()?.data.id

        const resultThreadLikeByThreadAndUser = await firstValueFrom(this.threadLikeService.getByThreadAndUser(id, userId))
        if (resultThreadLikeByThreadAndUser) {
          await firstValueFrom(this.threadLikeService.delete(resultThreadLikeByThreadAndUser.data.id))
          this.initData(this.threadById.id)
        }
      }
    }
    else {
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
        this.initData(this.threadById.id)

      } else if (isBookmarked) {
        const userId: string | undefined = this.loginService.getData()?.data.id

        const resultBookmarkByThreadAndUser = await firstValueFrom(this.bookmarkService.getByUserAndThread(id, userId))
        if (resultBookmarkByThreadAndUser) {
          await firstValueFrom(this.bookmarkService.delete(resultBookmarkByThreadAndUser.data.id))
          this.initData(this.threadById.id)
        }
      }
    }
    else {
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
        this.initData(this.threadById.id)
      }
    }
    else {
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

  async onReply(): Promise<void> {
    if (this.isLogin) {
      this.insertThreadComment.threadId = this.threadById.id
      await firstValueFrom(this.threadCommentService.insert(this.insertThreadComment))
      this.router.navigateByUrl('/member/dashboard')
    }
    else {
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

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe()
  }
}
