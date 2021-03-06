import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'

import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { UpdateProvinceDtoReq } from '../../../../../../core/src/app/dto/province/update-province-dto-req'
import { updateProvinceAction } from '../../../../../../core/src/app/state/province/province.action'
import { provinceSelectorById, provinceSelectorUpdate } from '../../../../../../core/src/app/state/province/province.selector'
import { LoadingService } from '../../../../../../core/src/app/service/loading.service'

@Component({
  selector: 'app-province-update',
  templateUrl: './province-update.component.html',
  styleUrls: ['./province-update.component.css']
})
export class ProvinceUpdateComponent implements OnInit, OnDestroy {

  data: UpdateProvinceDtoReq = new UpdateProvinceDtoReq()
  isLoading: boolean = false

  activatedRouteSubscription?: Subscription
  getByProvinceIdSubscription?: Subscription
  updateProvinceSubscription?: Subscription
  loadingServiceSubscription?: Subscription

  constructor(private title: Title, private router: Router, private activatedRoute: ActivatedRoute,
    private store: Store, private loadingService: LoadingService) {
    this.title.setTitle('Update Province')
  }

  ngOnInit(): void {
    this.loadingServiceSubscription = this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })

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
    this.loadingServiceSubscription?.unsubscribe()
  }
}
