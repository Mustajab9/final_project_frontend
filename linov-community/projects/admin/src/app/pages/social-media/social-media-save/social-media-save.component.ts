import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { InsertSocialMediaDtoReq } from '../../../../../../core/src/app/dto/social-media/insert-social-media-dto-req';
import { insertSocialMediaAction } from '../../../../../../core/src/app/state/social-media/social-media.action';
import { socialMediaSelectorInsert } from '../../../../../../core/src/app/state/social-media/social-media.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-social-media-save',
  templateUrl: './social-media-save.component.html',
  styleUrls: ['./social-media-save.component.css']
})
export class SocialMediaSaveComponent implements OnInit, OnDestroy {

  data: InsertSocialMediaDtoReq = new InsertSocialMediaDtoReq()
  socialMediaInsertSubscription?: Subscription

  constructor(private title: Title, private router: Router, private store: Store) {
    this.title.setTitle('Add Social Media')
  }

  ngOnInit(): void {
  }

  insertProgress(): void {
    this.socialMediaInsertSubscription = this.store.select(socialMediaSelectorInsert).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/admin/social-media/list')
      }
    })
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      this.store.dispatch(insertSocialMediaAction({ payload: this.data }))
      this.insertProgress()
    }
  }

  ngOnDestroy(): void {
    this.socialMediaInsertSubscription?.unsubscribe()
  }
}
