import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'

import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { UpdateIndustryDtoReq } from '../../../../../../core/src/app/dto/industry/update-industry-dto-req'
import { updateIndustryAction } from '../../../../../../core/src/app/state/industry/industry.action'
import { industrySelectorById, industrySelectorUpdate } from '../../../../../../core/src/app/state/industry/industry.selector'

@Component({
  selector: 'app-industry-update',
  templateUrl: './industry-update.component.html',
  styleUrls: ['./industry-update.component.css']
})
export class IndustryUpdateComponent implements OnInit, OnDestroy {

  data: UpdateIndustryDtoReq = new UpdateIndustryDtoReq()

  activatedRouteSubscription?: Subscription
  getByIndustryIdSubscription?: Subscription
  updateIndustrySubscription?: Subscription

  constructor(private title: Title, private router: Router, private activatedRoute: ActivatedRoute, private store: Store) {
    this.title.setTitle('Update Industry')
  }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result => {
      const id = (result as any).id
      this.getByIndustryIdSubscription = this.store.select(industrySelectorById(id)).subscribe(result => {
        this.data = { ...result }
      })
    })
  }

  updateProgress(): void {
    this.updateIndustrySubscription = this.store.select(industrySelectorUpdate).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/admin/industry/list')
      }
    })
  }

  onSubmit(isValid: boolean): void {
    if (isValid) {
      this.store.dispatch(updateIndustryAction({ payload: this.data }))
      this.updateProgress()
    }
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe()
    this.getByIndustryIdSubscription?.unsubscribe()
    this.updateIndustrySubscription?.unsubscribe()
  }
}
