import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { InsertBookmarkDtoReq } from 'projects/core/src/app/dto/bookmark/insert-bookmark-dto-req';
import { InsertChoiceVoteDtoReq } from 'projects/core/src/app/dto/choice-vote/insert-choice-vote-dto-req';
import { InsertThreadCommentDtoReq } from 'projects/core/src/app/dto/thread-comment/insert-thread-comment-dto-req';
import { InsertThreadLikeDtoReq } from 'projects/core/src/app/dto/thread-like/insert-thread-like-dto-req';
import { GetByThreadIdDtoDataRes } from 'projects/core/src/app/dto/thread/get-by-thread-id-dto-data-res';
import { BookmarkService } from 'projects/core/src/app/service/bookmark.service';
import { ChoiceVoteService } from 'projects/core/src/app/service/choice-vote.service';
import { LoginService } from 'projects/core/src/app/service/login.service';
import { ThreadLikeService } from 'projects/core/src/app/service/thread-like.service';
import { ThreadService } from 'projects/core/src/app/service/thread.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.css']
})
export class ThreadDetailComponent implements OnInit {

  threadById: GetByThreadIdDtoDataRes = new GetByThreadIdDtoDataRes()
  insertThreadComment: InsertThreadCommentDtoReq = new InsertThreadCommentDtoReq()
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
  threadByIdSubscription? : Subscription
  threadCommentInsertSubscription?: Subscription
  activatedRouteSubscription?: Subscription
  choiceVoteInsertSubscription?: Subscription

  value: number = 0;
  responsiveOptions: any;
  isLogin: boolean = this.loginService.isLogin()

  constructor(private title : Title, private router: Router,
    private threadService: ThreadService, private threadLikeService: ThreadLikeService,
    private bookmarkService: BookmarkService, private choiceVoteService: ChoiceVoteService,
    private loginService: LoginService, private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService) {

    this.title.setTitle('Thread Detail')
  }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result => {
      this.initData((result as any).id)
    })
  }

  initData(id: string): void {
    this.threadByIdSubscription = this.threadService.getById(id).subscribe(result => {
      this.threadById = result.data
    })
  }

  onLike(id: string, isLike: boolean): void {
    if(this.isLogin){
      this.insertThreadLikeDtoReq.threadId = id
      if (isLike == false) {
        isLike = !isLike
        this.threadLikeInsertSubscription = this.threadLikeService.insert(this.insertThreadLikeDtoReq).subscribe(_ => {
          this.initData(this.threadById.id)
        })
      } else if (isLike == true) {
        const userId: string | undefined = this.loginService.getData()?.data.id
        isLike = !isLike
        this.getThreadLikeByThreadAndUserSubscription = this.threadLikeService.getByThreadAndUser(id, userId).subscribe(result => {
          if (result) {
            this.threadLikeDeleteSubscription = this.threadLikeService.delete(result.data.id).subscribe(_ => {
              this.initData(this.threadById.id)
            })
          }
        })
      }
    }else{
      this.confirmationService.confirm({
        message: 'You Must Be Login First',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.router.navigateByUrl('/login/member')
        }
      });
    }
  }

  onBookmark(id: string, isBookmarked: boolean): void {
    if(this.isLogin){
      this.insertBookmarkDtoReq.threadId = id
      if (isBookmarked == false) {
        isBookmarked = !isBookmarked
        this.bookmarkInsertSubscription = this.bookmarkService.insert(this.insertBookmarkDtoReq).subscribe(_ => {
          this.initData(this.threadById.id)
        })
      } else if (isBookmarked == true) {
        const userId: string | undefined = this.loginService.getData()?.data.id
        isBookmarked = !isBookmarked
        this.getBookmarkByThreadAndUserSubscription = this.bookmarkService.getByUserAndThread(id, userId).subscribe(result => {
          if (result) {
            this.bookmarkDeleteSubscription = this.bookmarkService.delete(result.data.id).subscribe(_ => {
              this.initData(this.threadById.id)
            })
          }
        })
      }
    }else{
      this.confirmationService.confirm({
        message: 'You Must Be Login First',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.router.navigateByUrl('/login/member')
        }
      });
    }
  }

  onPolling(id: string, isVoted: boolean): void {
    if(this.isLogin){
      this.insertChoiceVoteDtoReq.choiceId = id
      if(isVoted == false) {
        isVoted = !isVoted
        this.choiceVoteInsertSubscription = this.choiceVoteService.insert(this.insertChoiceVoteDtoReq).subscribe(_ => {
          this.initData(this.threadById.id)
        })
      }
      this.value = this.value + Math.floor(Math.random() * 10) + 1;
      if (this.value >= 100) {
        this.value = 100;
      }
    }else{
      this.confirmationService.confirm({
        message: 'You Must Be Login First',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.router.navigateByUrl('/login/member')
        }
      });
    }
  }

}
