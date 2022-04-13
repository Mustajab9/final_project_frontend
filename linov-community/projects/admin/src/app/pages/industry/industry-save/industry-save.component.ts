import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { InsertIndustryDtoReq } from '../../../../../../core/src/app/dto/industry/insert-industry-dto-req'
import { insertIndustryAction } from '../../../../../../core/src/app/state/industry/industry.action'
import { industrySelectorInsert } from '../../../../../../core/src/app/state/industry/industry.selector'

@Component({
  selector: 'app-industry-save',
  templateUrl: './industry-save.component.html',
  styleUrls: ['./industry-save.component.css']
})
export class IndustrySaveComponent implements OnInit, OnDestroy {

  data: InsertIndustryDtoReq = new InsertIndustryDtoReq()
  industryInsertSubscription?: Subscription

  constructor(private title: Title, private router: Router, private store: Store) {
    this.title.setTitle('Add Industry')
  }

  ngOnInit(): void {
  }

  insertProgress(): void {
    this.industryInsertSubscription = this.store.select(industrySelectorInsert).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/admin/industry/list')
      }
    })
  }

  onSubmit(isValid: boolean): void {
    if (isValid) {
      this.store.dispatch(insertIndustryAction({ payload: this.data }))
      this.insertProgress()
    }
  }

  ngOnDestroy(): void {
    this.industryInsertSubscription?.unsubscribe()
  }
}
