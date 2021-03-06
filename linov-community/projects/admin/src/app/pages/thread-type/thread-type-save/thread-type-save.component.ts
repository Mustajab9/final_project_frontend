import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { InsertThreadTypeDtoReq } from '../../../../../../core/src/app/dto/thread-type/insert-thread-type-dto-req'
import { insertThreadTypeAction } from '../../../../../../core/src/app/state/thread-type/thread-type.action'
import { threadTypeSelectorInsert } from '../../../../../../core/src/app/state/thread-type/thread-type.selector'
import { LoadingService } from '../../../../../../core/src/app/service/loading.service'

@Component({
  selector: 'app-thread-type-save',
  templateUrl: './thread-type-save.component.html',
  styleUrls: ['./thread-type-save.component.css']
})
export class ThreadTypeSaveComponent implements OnInit, OnDestroy {

  data: InsertThreadTypeDtoReq = new InsertThreadTypeDtoReq()
  isLoading: boolean = false

  threadTypeInsertSubscription?: Subscription
  loadingServiceSubscription?: Subscription

  constructor(private title: Title, private router: Router, private store: Store, private loadingService: LoadingService) {
    this.title.setTitle('Add Thread Type')
  }

  ngOnInit(): void {
    this.loadingServiceSubscription = this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })
  }

  insertProgress(): void {
    this.threadTypeInsertSubscription = this.store.select(threadTypeSelectorInsert).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/admin/thread-type/list')
      }
    })
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      this.store.dispatch(insertThreadTypeAction({ payload: this.data }))
      this.insertProgress()
    }
  }

  ngOnDestroy(): void {
    this.threadTypeInsertSubscription?.unsubscribe()
    this.loadingServiceSubscription?.unsubscribe()
  }
}
