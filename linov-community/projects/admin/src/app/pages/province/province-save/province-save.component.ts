import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { InsertProvinceDtoReq } from '../../../../../../core/src/app/dto/province/insert-province-dto-req'
import { insertProvinceAction } from '../../../../../../core/src/app/state/province/province.action'
import { provinceSelectorInsert } from '../../../../../../core/src/app/state/province/province.selector'

@Component({
  selector: 'app-province-save',
  templateUrl: './province-save.component.html',
  styleUrls: ['./province-save.component.css']
})
export class ProvinceSaveComponent implements OnInit, OnDestroy {

  data: InsertProvinceDtoReq = new InsertProvinceDtoReq()
  provinceInsertSubscription?: Subscription

  constructor(private title: Title, private router: Router, private store: Store) {
    this.title.setTitle('Add Province')
  }

  ngOnInit(): void {
  }

  insertProgress(): void {
    this.provinceInsertSubscription = this.store.select(provinceSelectorInsert).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/admin/province/list')
      }
    })
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      this.store.dispatch(insertProvinceAction({ payload: this.data }))
      this.insertProgress()
    }
  }

  ngOnDestroy(): void {
    this.provinceInsertSubscription?.unsubscribe()
  }
}
