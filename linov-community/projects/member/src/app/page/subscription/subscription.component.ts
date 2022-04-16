import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GetAllPriceListMemberDtoDataRes } from 'projects/core/src/app/dto/price-list-member/get-all-price-list-member-dto-data-res';
import { InsertSubscriptionDtoReq } from 'projects/core/src/app/dto/subscription/insert-subscription-dto-req';
import { LoadingService } from 'projects/core/src/app/service/loading.service';
import { LoginService } from 'projects/core/src/app/service/login.service';
import { PriceListMemberService } from 'projects/core/src/app/service/price-list-member.service';
import { ProfilesService } from 'projects/core/src/app/service/profiles.service';
import { SubscriptionService } from 'projects/core/src/app/service/subscription.service';
import { firstValueFrom, Subscription } from 'rxjs';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit, OnDestroy {

  userId?: string
  profileId?: string
  isLoading: boolean = false
  subPrices: GetAllPriceListMemberDtoDataRes[] = []
  subInsert: InsertSubscriptionDtoReq = new InsertSubscriptionDtoReq()
  loadingSubscription?: Subscription

  constructor(private loginService: LoginService, private subscriptionService: SubscriptionService,
    private profileService: ProfilesService, private priceListMemberService: PriceListMemberService,
    private router: Router, private loadingSevrice: LoadingService, private title: Title) {
      this.title.setTitle('Subscription Page')
  }

  ngOnInit(): void {
    this.initData()
  }

  async initData(): Promise<void> {
    this.loadingSevrice.loading$?.subscribe(result => {
      this.isLoading = result
    })

    const resultAllPriceList = await firstValueFrom(this.priceListMemberService.getAll())
    this.subPrices = resultAllPriceList.data
  }

  async submit(priceId: string): Promise<void> {
    this.userId = this.loginService.getData()?.data?.id

    const resultProfileById = await firstValueFrom(this.profileService.getByUserId())
    this.profileId = resultProfileById.data?.id

    this.subInsert.profileId = this.profileId
    this.subInsert.priceId = priceId

    const resultInsertSubscription = await firstValueFrom(this.subscriptionService.insert(this.subInsert))
    if (resultInsertSubscription) {
      this.initData()
    }
  }

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe()
  }

}
