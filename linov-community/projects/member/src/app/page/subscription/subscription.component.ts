import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetAllPriceListMemberDtoDataRes } from 'projects/core/src/app/dto/price-list-member/get-all-price-list-member-dto-data-res';
import { InsertSubscriptionDtoReq } from 'projects/core/src/app/dto/subscription/insert-subscription-dto-req';
import { LoginService } from 'projects/core/src/app/service/login.service';
import { PriceListMemberService } from 'projects/core/src/app/service/price-list-member.service';
import { ProfilesService } from 'projects/core/src/app/service/profiles.service';
import { SubscriptionService } from 'projects/core/src/app/service/subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  userId?: string
  profileId?: string
  subPrices: GetAllPriceListMemberDtoDataRes[] = []
  subInsert: InsertSubscriptionDtoReq = new InsertSubscriptionDtoReq()
  constructor(private loginService: LoginService, private subscriptionService: SubscriptionService, private profileService: ProfilesService, private priceListMemberService: PriceListMemberService, private router: Router) { }

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.priceListMemberService.getAll().subscribe(result => {
      this.subPrices = result.data
    })
  }

  submit(priceId: string): void {
    this.userId = this.loginService.getData()?.data?.id
    this.profileService.getByUserId(this.userId).subscribe(result => {
      this.profileId = result.data?.id
    })
    this.subInsert.profileId = this.profileId
    this.subInsert.priceId = priceId

    this.subscriptionService.insert(this.subInsert).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('member/subscription/')
      }
    })
  }

}
