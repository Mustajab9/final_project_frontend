import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { InsertRegencyDtoReq } from '../../../../../../core/src/app/dto/regency/insert-regency-dto-req';
import { insertRegencyAction } from '../../../../../../core/src/app/state/regency/regency.action';
import { regencySelectorInsert } from '../../../../../../core/src/app/state/regency/regency.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-regency-save',
  templateUrl: './regency-save.component.html',
  styleUrls: ['./regency-save.component.css']
})
export class RegencySaveComponent implements OnInit, OnDestroy {

  data: InsertRegencyDtoReq = new InsertRegencyDtoReq()
  regencyInsertSubscription?: Subscription

  constructor(private title: Title, private router: Router, private store: Store) {
    this.title.setTitle('Add Regency')
  }

  ngOnInit(): void {
  }

  insertProgress(): void {
    this.regencyInsertSubscription = this.store.select(regencySelectorInsert).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/admin/regency/list')
      }
    })
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      this.store.dispatch(insertRegencyAction({ payload: this.data }))
      this.insertProgress()
    }
  }

  ngOnDestroy(): void {
    this.regencyInsertSubscription?.unsubscribe()
  }
}
