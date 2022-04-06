import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { InsertPriceListMemberDtoReq } from '../../../../../../core/src/app/dto/price-list-member/insert-price-list-member-dto-req';
import { insertPriceListMemberAction } from '../../../../../../core/src/app/state/price-list-member/price-list-member.action';
import { priceListMemberSelectorInsert } from '../../../../../../core/src/app/state/price-list-member/price-list-member.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-price-list-member-save',
  templateUrl: './price-list-member-save.component.html',
  styleUrls: ['./price-list-member-save.component.css']
})
export class PriceListMemberSaveComponent implements OnInit, OnDestroy {

  data: InsertPriceListMemberDtoReq = new InsertPriceListMemberDtoReq()
  priceListMemberInsertSubscription?: Subscription

  constructor(private title: Title, private router: Router, private store: Store) {
    this.title.setTitle('Add Price Member List')
  }

  ngOnInit(): void {
  }

  insertProgress(): void {
    this.priceListMemberInsertSubscription = this.store.select(priceListMemberSelectorInsert).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/admin/price-list-member/list')
      }
    })
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      this.store.dispatch(insertPriceListMemberAction({ payload: this.data }))
      this.insertProgress()
    }
  }

  ngOnDestroy(): void {
    this.priceListMemberInsertSubscription?.unsubscribe()
  }
}
