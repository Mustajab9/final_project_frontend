import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'

import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { UpdateSocialMediaDtoReq } from '../../../../../../core/src/app/dto/social-media/update-social-media-dto-req'
import { updateSocialMediaAction } from '../../../../../../core/src/app/state/social-media/social-media.action'
import { socialMediaSelectorById, socialMediaSelectorUpdate } from '../../../../../../core/src/app/state/social-media/social-media.selector'
import { LoadingService } from '../../../../../../core/src/app/service/loading.service'

@Component({
  selector: 'app-social-media-update',
  templateUrl: './social-media-update.component.html',
  styleUrls: ['./social-media-update.component.css']
})
export class SocialMediaUpdateComponent implements OnInit, OnDestroy {

  data: UpdateSocialMediaDtoReq = new UpdateSocialMediaDtoReq()
  isLoading: boolean = false

  activatedRouteSubscription?: Subscription
  getBySocialMediaIdSubscription?: Subscription
  updateSocialMediaSubscription?: Subscription
  loadingServiceSubscription?: Subscription

  constructor(private title: Title, private router: Router, private activatedRoute: ActivatedRoute,
    private store: Store, private loadingService: LoadingService) {
    this.title.setTitle('Update Social Media')
  }

  ngOnInit(): void {
    this.loadingServiceSubscription = this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })

    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result => {
      const id = (result as any).id
      this.getBySocialMediaIdSubscription = this.store.select(socialMediaSelectorById(id)).subscribe(result => {
        this.data = { ...result }
      })
    })
  }

  updateProgress(): void {
    this.updateSocialMediaSubscription = this.store.select(socialMediaSelectorUpdate).subscribe(result => {
      if(result){
        this.router.navigateByUrl('/admin/social-media/list')
      }
    })
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      this.store.dispatch(updateSocialMediaAction({ payload: this.data }))
      this.updateProgress()
    }
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe()
    this.getBySocialMediaIdSubscription?.unsubscribe()
    this.updateSocialMediaSubscription?.unsubscribe()
    this.loadingServiceSubscription?.unsubscribe()
  }
}
