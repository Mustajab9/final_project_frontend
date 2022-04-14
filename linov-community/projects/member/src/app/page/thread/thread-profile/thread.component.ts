import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { GetBookmarkByUserDtoDataRes } from 'projects/core/src/app/dto/bookmark/get-bookmark-by-user-dto-data-res';
import { InsertBookmarkDtoReq } from 'projects/core/src/app/dto/bookmark/insert-bookmark-dto-req';
import { InsertChoiceVoteDtoReq } from 'projects/core/src/app/dto/choice-vote/insert-choice-vote-dto-req';
import { GetProfileSosmedByUserDtoDataRes } from 'projects/core/src/app/dto/profile-sosmed/get-profile-sosmed-by-user-dto-data-res';
import { GetProfileByUserDtoDataRes } from 'projects/core/src/app/dto/profiles/get-profile-by-user-dto-data-res';
import { GetByUserIdDtoDataRes } from 'projects/core/src/app/dto/thread-like/get-by-user-id-dto-data-res';
import { InsertThreadLikeDtoReq } from 'projects/core/src/app/dto/thread-like/insert-thread-like-dto-req';
import { GetThreadByUserDtoDataRes } from 'projects/core/src/app/dto/thread/get-thread-by-user-dto-data-res';
import { BookmarkService } from 'projects/core/src/app/service/bookmark.service';
import { ChoiceVoteService } from 'projects/core/src/app/service/choice-vote.service';
import { LoadingService } from 'projects/core/src/app/service/loading.service';
import { LoginService } from 'projects/core/src/app/service/login.service';
import { ProfileSosmedService } from 'projects/core/src/app/service/profile-sosmed.service';
import { ProfilesService } from 'projects/core/src/app/service/profiles.service';
import { ThreadLikeService } from 'projects/core/src/app/service/thread-like.service';
import { ThreadService } from 'projects/core/src/app/service/thread.service';
import { Subscription } from 'rxjs';

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
  profileSubscription?: Subscription
  profileSosmedsSubscription?: Subscription
  threadByUsersSubscription?: Subscription
  threadByUserLikesSubscription?: Subscription
  threadByBookmarksSubscription?: Subscription
  getThreadLikeByThreadAndUserSubscription?: Subscription
  threadLikeInsertSubscription?: Subscription
  threadLikeDeleteSubscription?: Subscription
  getBookmarkByThreadAndUserSubscription?: Subscription
  bookmarkInsertSubscription?: Subscription
  bookmarkDeleteSubscription?: Subscription
  choiceVoteInsertSubscription?: Subscription
  activatedRouteSubscription?: Subscription

  value: number = 0;
  responsiveOptions: any;
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
    ];
  }

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })

    this.profileSubscription = this.profileService.getByUserId().subscribe(result => {
      this.profile = result.data
    })

    this.profileSosmedsSubscription = this.profileSosmedService.getByUser().subscribe(result => {
      this.profileSosmeds = result.data
    })

    this.threadByUsersSubscription = this.threadService.getByUser().subscribe(result => {
      this.threadByUsers = result.data
    })

    this.threadByUserLikesSubscription = this.threadLikeService.getByUser().subscribe(result => {
      this.threadByUserLikes = result.data
    })

    this.threadByBookmarksSubscription = this.bookmarkService.getByUser().subscribe(result => {
      this.threadByBookmarks = result.data
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

  onPolling(id: string, isVoted: boolean): void {
    this.insertChoiceVoteDtoReq.choiceId = id
    if(isVoted == false) {
      isVoted = !isVoted
      this.choiceVoteInsertSubscription = this.choiceVoteService.insert(this.insertChoiceVoteDtoReq).subscribe(_ => {
        this.initData()
      })
    }
    this.value = this.value + Math.floor(Math.random() * 10) + 1;
    if (this.value >= 100) {
      this.value = 100;
    }
  }

  ngOnDestroy(): void {

  }
}
