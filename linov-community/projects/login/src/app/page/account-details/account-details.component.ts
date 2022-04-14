import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'

import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { GetAllIndustryDtoDataRes } from '../../../../../core/src/app/dto/industry/get-all-industry-dto-data-res'
import { GetAllPositionDtoDataRes } from '../../../../../core/src/app/dto/position/get-all-position-dto-data-res'
import { InsertProfilesDtoReq } from '../../../../../core/src/app/dto/profiles/insert-profiles-dto-req'
import { IndustryService } from '../../../../../core/src/app/service/industry.service'
import { LoadingService } from '../../../../../core/src/app/service/loading.service'
import { PositionService } from '../../../../../core/src/app/service/position.service'
import { insertProfilesAction } from '../../../../../core/src/app/state/profiles/profiles.action'
import { profilesSelectorInsert } from '../../../../../core/src/app/state/profiles/profiles.selector'

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit, OnDestroy {

  data: InsertProfilesDtoReq = new InsertProfilesDtoReq()
  isLoading: boolean = false

  industries: GetAllIndustryDtoDataRes[] = []
  positions: GetAllPositionDtoDataRes[] = []

  activatedRouteSubscription?: Subscription
  insertProfileSubscription?: Subscription
  getAllIndustrySubscription?: Subscription
  getAllPositioSubscription?: Subscription
  loadingServiceSubscription?: Subscription

  constructor(private title: Title, private router: Router, private store: Store, private activatedRoute: ActivatedRoute,
    private industryService: IndustryService, private positionService: PositionService, private loadingService: LoadingService) {
    this.title.setTitle("Sign Up")
  }

  ngOnInit(): void {
    this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })

    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result => {
      const fullName = (result as any).fullName
      const id = (result as any).id

      this.data.userId = id
      this.data.profileName = fullName
    })

    this.getAllIndustrySubscription = this.industryService.getAll().subscribe(result => {
      if (result) {
        this.industries = result.data
      }
    })

    this.getAllPositioSubscription = this.positionService.getAll().subscribe(result => {
      if (result) {
        this.positions = result.data
      }
    })
  }

  insertProgress(): void {
    this.insertProfileSubscription = this.store.select(profilesSelectorInsert).subscribe(result => {
      if (result) {
        this.router.navigateByUrl(`member/verification-code/${this.data.userId}`)
      }
    })
  }

  onSumbit(isValid: boolean) {
    if (isValid) {
      this.store.dispatch(insertProfilesAction({ payload: this.data }))
      this.insertProgress()
    }
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe()
    this.insertProfileSubscription?.unsubscribe()
  }
}
