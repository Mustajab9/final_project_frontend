import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UpdateRegencyDtoReq } from '../../../../../../core/src/app/dto/regency/update-regency-dto-req';
import { updateRegencyAction } from '../../../../../../core/src/app/state/regency/regency.action';
import { regencySelectorById, regencySelectorUpdate } from '../../../../../../core/src/app/state/regency/regency.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-regency-update',
  templateUrl: './regency-update.component.html',
  styleUrls: ['./regency-update.component.css']
})
export class RegencyUpdateComponent implements OnInit, OnDestroy {

  data: UpdateRegencyDtoReq = new UpdateRegencyDtoReq()

  activatedRouteSubscription?: Subscription
  getByRegencyIdSubscription?: Subscription
  updateRegencySubscription?: Subscription

  constructor(private title: Title, private router: Router, private activatedRoute: ActivatedRoute, private store: Store) {
    this.title.setTitle('Update Regency')
  }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result => {
      const id = (result as any).id
      this.getByRegencyIdSubscription = this.store.select(regencySelectorById(id)).subscribe(result => {
        this.data.regencyName = result.regancyName
      })
    })
  }

  updateProgress(): void {
    this.updateRegencySubscription = this.store.select(regencySelectorUpdate).subscribe(result => {
      if(result){
        this.router.navigateByUrl('/admin/regency/list')
      }
    })
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      this.store.dispatch(updateRegencyAction({ payload: this.data }))
      this.updateProgress()
    }
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe()
    this.getByRegencyIdSubscription?.unsubscribe()
    this.updateRegencySubscription?.unsubscribe()
  }
}
