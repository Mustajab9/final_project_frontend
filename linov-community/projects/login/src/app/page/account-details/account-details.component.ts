import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GetAllIndustryDtoDataRes } from 'projects/core/src/app/dto/industry/get-all-industry-dto-data-res';
import { GetAllPositionDtoDataRes } from 'projects/core/src/app/dto/position/get-all-position-dto-data-res';
import { InsertProfilesDtoReq } from 'projects/core/src/app/dto/profiles/insert-profiles-dto-req';
import { IndustryService } from 'projects/core/src/app/service/industry.service';
import { PositionService } from 'projects/core/src/app/service/position.service';
import { insertProfilesAction } from 'projects/core/src/app/state/profiles/profiles.action';
import { profilesSelectorInsert } from 'projects/core/src/app/state/profiles/profiles.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit, OnDestroy {

  data: InsertProfilesDtoReq = new InsertProfilesDtoReq()

  industries: GetAllIndustryDtoDataRes[] = []
  positions: GetAllPositionDtoDataRes[] = []

  activatedRouteSubscription?: Subscription
  insertProfileSubscription?: Subscription
  getAllIndustrySubscription?: Subscription
  getAllPositioSubscription?: Subscription

  constructor(private title: Title, private router: Router, private store: Store, private activatedRoute: ActivatedRoute,
              private industryService: IndustryService, private positionService: PositionService) {
    this.title.setTitle("Sign Up")
  }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result => {
      const fullName = (result as any).fullName
      const id = (result as any).id

      this.data.userId = id
      this.data.profileName = fullName
    })

    this.getAllIndustrySubscription = this.industryService.getAll().subscribe(result => {
      if(result){
        this.industries = result.data
      }
    })

    this.getAllPositioSubscription = this.positionService.getAll().subscribe(result => {
      if(result){
        this.positions = result.data
      }
    })
  }

  insertProgress(): void {
    this.insertProfileSubscription = this.store.select(profilesSelectorInsert).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/login')
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
    this.activatedRouteSubscription?.unsubscribe
    this.insertProfileSubscription?.unsubscribe
  }
}
