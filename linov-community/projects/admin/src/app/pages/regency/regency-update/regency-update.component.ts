import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'

import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { UpdateRegencyDtoReq } from '../../../../../../core/src/app/dto/regency/update-regency-dto-req'
import { updateRegencyAction } from '../../../../../../core/src/app/state/regency/regency.action'
import { regencySelectorById, regencySelectorUpdate } from '../../../../../../core/src/app/state/regency/regency.selector'
import { LoadingService } from '../../../../../../core/src/app/service/loading.service'

@Component({
  selector: 'app-regency-update',
  templateUrl: './regency-update.component.html',
  styleUrls: ['./regency-update.component.css']
})
export class RegencyUpdateComponent implements OnInit, OnDestroy {

  data: UpdateRegencyDtoReq = new UpdateRegencyDtoReq()
  isLoading: boolean = false

  activatedRouteSubscription?: Subscription
  getByRegencyIdSubscription?: Subscription
  updateRegencySubscription?: Subscription
  loadingServiceSubscription?: Subscription

  constructor(private title: Title, private router: Router, private activatedRoute: ActivatedRoute,
    private store: Store, private loadingService: LoadingService) {
    this.title.setTitle('Update Regency')
  }

  ngOnInit(): void {
    this.loadingServiceSubscription = this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })

    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result => {
      const id = (result as any).id
      this.getByRegencyIdSubscription = this.store.select(regencySelectorById(id)).subscribe(result => {
        this.data.id = result.id
        this.data.regencyName = result.regancyName
        this.data.version = result.version
        this.data.isActive = result.isActive
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
    this.loadingServiceSubscription?.unsubscribe()
  }
}
