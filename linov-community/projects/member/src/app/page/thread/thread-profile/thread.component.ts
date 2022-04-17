import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { firstValueFrom, Subscription } from 'rxjs'

import { GetBookmarkByUserDtoDataRes } from '../../../../../../core/src/app/dto/bookmark/get-bookmark-by-user-dto-data-res'
import { InsertBookmarkDtoReq } from '../../../../../../core/src/app/dto/bookmark/insert-bookmark-dto-req'
import { InsertChoiceVoteDtoReq } from '../../../../../../core/src/app/dto/choice-vote/insert-choice-vote-dto-req'
import { GetProfileSosmedByUserDtoDataRes } from '../../../../../../core/src/app/dto/profile-sosmed/get-profile-sosmed-by-user-dto-data-res'
import { GetProfileByUserDtoDataRes } from '../../../../../../core/src/app/dto/profiles/get-profile-by-user-dto-data-res'
import { GetByUserIdDtoDataRes } from '../../../../../../core/src/app/dto/thread-like/get-by-user-id-dto-data-res'
import { InsertThreadLikeDtoReq } from '../../../../../../core/src/app/dto/thread-like/insert-thread-like-dto-req'
import { GetThreadByUserDtoDataRes } from '../../../../../../core/src/app/dto/thread/get-thread-by-user-dto-data-res'
import { BookmarkService } from '../../../../../../core/src/app/service/bookmark.service'
import { ChoiceVoteService } from '../../../../../../core/src/app/service/choice-vote.service'
import { LoadingService } from '../../../../../../core/src/app/service/loading.service'
import { LoginService } from '../../../../../../core/src/app/service/login.service'
import { ProfileSosmedService } from '../../../../../../core/src/app/service/profile-sosmed.service'
import { ProfilesService } from '../../../../../../core/src/app/service/profiles.service'
import { ThreadLikeService } from '../../../../../../core/src/app/service/thread-like.service'
import { ThreadService } from '../../../../../../core/src/app/service/thread.service'

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit, OnDestroy {

  profile: GetProfileByUserDtoDataRes = new GetProfileByUserDtoDataRes()
  profileSosmeds: GetProfileSosmedByUserDtoDataRes[] = []
  threadByUsers: GetThreadByUserDtoDataRes[] = []
  threadByUserLikes: GetByUserIdDtoDataRes[] = []
  threadByBookmarks: GetBookmarkByUserDtoDataRes[] = []
  insertThreadLikeDtoReq: InsertThreadLikeDtoReq = new InsertThreadLikeDtoReq()
  insertBookmarkDtoReq: InsertBookmarkDtoReq = new InsertBookmarkDtoReq()
  insertChoiceVoteDtoReq: InsertChoiceVoteDtoReq = new InsertChoiceVoteDtoReq()
  loadingSubscription?: Subscription

  value: number = 0
  responsiveOptions: any
  isLoading: boolean = false

  constructor(private title: Title, private router: Router,
    private profileService: ProfilesService, private profileSosmedService: ProfileSosmedService,
    private threadService: ThreadService, private loginService: LoginService,
    private threadLikeService: ThreadLikeService, private bookmarkService: BookmarkService,
    private choiceVoteService: ChoiceVoteService, private loadingService: LoadingService) {

    this.title.setTitle('Home')
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

    const resultProfileByUser = await firstValueFrom(this.profileService.getByUserId())
    this.profile = resultProfileByUser.data

    const resultProfileSosmedByUser = await firstValueFrom(this.profileSosmedService.getByUser())
    this.profileSosmeds = resultProfileSosmedByUser.data

    const resultThreadByUser = await firstValueFrom(this.threadService.getByUser())
    this.threadByUsers = resultThreadByUser.data.filter(comp => {
      comp.isReadMore = true
      return comp.typeCode == 'TY01' || comp.typeCode == 'TY02'
    })

    const resultThreadByUserLike = await firstValueFrom(this.threadLikeService.getByUser())
    this.threadByUserLikes = resultThreadByUserLike.data

    const resultThreadByBookmark = await firstValueFrom(this.bookmarkService.getByUser())
    this.threadByBookmarks = resultThreadByBookmark.data
  }

  showText(id: string): void {
    this.router.navigateByUrl(`/member/thread/detail/${id}`)
  }

  async onLike(id: string, isLike: boolean): Promise<void> {
    this.insertThreadLikeDtoReq.threadId = id
    if (!isLike) {
      await firstValueFrom(this.threadLikeService.insert(this.insertThreadLikeDtoReq))
      this.initData()

    } else if (isLike) {
      const userId: string | undefined = this.loginService.getData()?.data.id

      const resultThreadLikeByThreadAndUser = await firstValueFrom(this.threadLikeService.getByThreadAndUser(id, userId))
      if (resultThreadLikeByThreadAndUser) {
        await firstValueFrom(this.threadLikeService.delete(resultThreadLikeByThreadAndUser.data.id))
        this.initData()
      }
    }
  }

  async onBookmark(id: string, isBookmarked: boolean): Promise<void> {
    this.insertBookmarkDtoReq.threadId = id
    if (!isBookmarked) {
      await firstValueFrom(this.bookmarkService.insert(this.insertBookmarkDtoReq))
      this.initData()

    } else if (isBookmarked) {
      const userId: string | undefined = this.loginService.getData()?.data.id

      const resultBookmarkByThreadAndUser = await firstValueFrom(this.bookmarkService.getByUserAndThread(id, userId))
      if (resultBookmarkByThreadAndUser) {
        await firstValueFrom(this.bookmarkService.delete(resultBookmarkByThreadAndUser.data.id))
        this.initData()
      }
    }
  }

  async onPolling(id: string, isVoted: boolean): Promise<void> {
    this.insertChoiceVoteDtoReq.choiceId = id
    if(!isVoted) {
      await firstValueFrom(this.choiceVoteService.insert(this.insertChoiceVoteDtoReq))
      this.initData()
    }
  }

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe()
  }
}
