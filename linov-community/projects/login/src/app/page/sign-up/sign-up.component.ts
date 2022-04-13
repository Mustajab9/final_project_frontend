import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { InsertUserDtoReq } from 'projects/core/src/app/dto/user/insert-user-dto-req';
import { insertUserAction } from 'projects/core/src/app/state/user/user.action';
import { userSelectorInsert } from 'projects/core/src/app/state/user/user.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  data: InsertUserDtoReq = new InsertUserDtoReq()
  fullName?: string
  registerSubscription?: Subscription

  constructor(private title: Title, private router: Router, private store: Store) {
    this.title.setTitle("Sign Up")
  }

  ngOnInit(): void {
    this.data.roleCode = 'R03'
  }

  insertProgress(): void {
    this.registerSubscription = this.store.select(userSelectorInsert).subscribe(result => {
      if (result) {
        this.router.navigateByUrl(`member/account-details/${this.fullName}/${result.payload.id}`)
      }
    })
  }

  onRegister(isValid: boolean) {
    if (isValid) {
      this.store.dispatch(insertUserAction({ payload: this.data }))
      this.insertProgress()
    }
  }

  ngOnDestroy(): void {
    this.registerSubscription?.unsubscribe()
  }
}
