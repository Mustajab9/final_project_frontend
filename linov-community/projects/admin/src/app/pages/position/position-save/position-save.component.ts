import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { InsertPositionDtoReq } from '../../../../../../core/src/app/dto/position/insert-position-dto-req'
import { insertPositionAction } from '../../../../../../core/src/app/state/position/position.action'
import { positionSelectorInsert } from '../../../../../../core/src/app/state/position/position.selector'

@Component({
  selector: 'app-position-save',
  templateUrl: './position-save.component.html',
  styleUrls: ['./position-save.component.css']
})
export class PositionSaveComponent implements OnInit, OnDestroy {

  data: InsertPositionDtoReq = new InsertPositionDtoReq()
  positionInsertSubscription?: Subscription

  constructor(private title: Title, private router: Router, private store: Store) {
    this.title.setTitle('Add Position')
  }

  ngOnInit(): void {
  }

  insertProgress(): void {
    this.positionInsertSubscription = this.store.select(positionSelectorInsert).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/admin/position/list')
      }
    })
  }

  onSubmit(isValid: boolean): void {
    if (isValid) {
      this.store.dispatch(insertPositionAction({ payload: this.data }))
      this.insertProgress()
    }
  }

  ngOnDestroy(): void {
    this.positionInsertSubscription?.unsubscribe()
  }
}
