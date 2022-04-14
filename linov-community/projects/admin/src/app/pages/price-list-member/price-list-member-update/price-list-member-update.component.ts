import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'

import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { UpdatePriceListMemberDtoReq } from '../../../../../../core/src/app/dto/price-list-member/update-price-list-member-dto-req'
import { updatePriceListMemberAction } from '../../../../../../core/src/app/state/price-list-member/price-list-member.action'
import { priceListMemberSelectorById, priceListMemberSelectorUpdate } from '../../../../../../core/src/app/state/price-list-member/price-list-member.selector'
import { LoadingService } from '../../../../../../core/src/app/service/loading.service'

@Component({
  selector: 'app-price-list-member-update',
  templateUrl: './price-list-member-update.component.html',
  styleUrls: ['./price-list-member-update.component.css']
})
export class PriceListMemberUpdateComponent implements OnInit, OnDestroy {

  data: UpdatePriceListMemberDtoReq = new UpdatePriceListMemberDtoReq()
  isLoading: boolean = false

  activatedRouteSubscription?: Subscription
  getByPriceListMemberIdSubscription?: Subscription
  updatePriceListMemberSubscription?: Subscription
  loadingServiceSubscription?: Subscription

  constructor(private title: Title, private router: Router, private activatedRoute: ActivatedRoute,
    private store: Store, private loadingService: LoadingService) {
    this.title.setTitle('Update Price Member List')
  }

  ngOnInit(): void {
    this.loadingServiceSubscription = this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })

    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result => {
      const id = (result as any).id
      this.getByPriceListMemberIdSubscription = this.store.select(priceListMemberSelectorById(id)).subscribe(result => {
        this.data = { ...result }
      })
    })
  }

  updateProgress(): void {
    this.updatePriceListMemberSubscription = this.store.select(priceListMemberSelectorUpdate).subscribe(result => {
      if(result){
        this.router.navigateByUrl('/admin/price-list-member/list')
      }
    })
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      this.store.dispatch(updatePriceListMemberAction({ payload: this.data }))
      this.updateProgress()
    }
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe()
    this.getByPriceListMemberIdSubscription?.unsubscribe()
    this.updatePriceListMemberSubscription?.unsubscribe()
    this.loadingServiceSubscription?.unsubscribe()
  }
}
