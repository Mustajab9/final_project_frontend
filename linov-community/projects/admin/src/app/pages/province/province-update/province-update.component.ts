import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UpdateProvinceDtoReq } from 'projects/core/src/app/dto/province/update-province-dto-req';
import { updateProvinceAction } from 'projects/core/src/app/state/province/province.action';
import { provinceSelectorById, provinceSelectorUpdate } from 'projects/core/src/app/state/province/province.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-province-update',
  templateUrl: './province-update.component.html',
  styleUrls: ['./province-update.component.css']
})
export class ProvinceUpdateComponent implements OnInit, OnDestroy {

  data: UpdateProvinceDtoReq = new UpdateProvinceDtoReq()

  activatedRouteSubscription?: Subscription
  getByProvinceIdSubscription?: Subscription
  updateProvinceSubscription?: Subscription

  constructor(private title: Title, private router: Router, private activatedRoute: ActivatedRoute, private store: Store) {
    this.title.setTitle('Update Province')
  }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result => {
      const id = (result as any).id
      this.getByProvinceIdSubscription = this.store.select(provinceSelectorById(id)).subscribe(result => {
        this.data = { ...result }
      })
    })
  }

  updateProgress(): void {
    this.updateProvinceSubscription = this.store.select(provinceSelectorUpdate).subscribe(result => {
      if(result){
        this.router.navigateByUrl('/admin/province/list')
      }
    })
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      this.store.dispatch(updateProvinceAction({ payload: this.data }))
      this.updateProgress()
    }
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe()
    this.getByProvinceIdSubscription?.unsubscribe()
    this.updateProvinceSubscription?.unsubscribe()
  }
}
