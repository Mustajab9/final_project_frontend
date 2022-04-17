import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import { firstValueFrom, Subscription } from 'rxjs'

import { GetAllPriceListMemberDtoDataRes } from '../../../../../core/src/app/dto/price-list-member/get-all-price-list-member-dto-data-res'
import { InsertSubscriptionDtoReq } from '../../../../../core/src/app/dto/subscription/insert-subscription-dto-req'
import { UpdateSubscriptionDtoReq } from '../../../../../core/src/app/dto/subscription/update-subscription-dto-req'
import { LoginDtoRes } from '../../../../../core/src/app/dto/user/login-dto-res'
import { LoadingService } from '../../../../../core/src/app/service/loading.service'
import { LoginService } from '../../../../../core/src/app/service/login.service'
import { PriceListMemberService } from '../../../../../core/src/app/service/price-list-member.service'
import { ProfilesService } from '../../../../../core/src/app/service/profiles.service'
import { SubscriptionService } from '../../../../../core/src/app/service/subscription.service'

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit, OnDestroy {

  userId?: string
  profileId?: string
  isLoading: boolean = false
  writeType!: string
  subPrices: GetAllPriceListMemberDtoDataRes[] = []
  subInsert: InsertSubscriptionDtoReq = new InsertSubscriptionDtoReq()
  subUpdate: UpdateSubscriptionDtoReq = new UpdateSubscriptionDtoReq()
  loadingSubscription?: Subscription
  login: LoginDtoRes = this.loginService.getData()!

  constructor(private loginService: LoginService, private subscriptionService: SubscriptionService,
    private profileService: ProfilesService, private priceListMemberService: PriceListMemberService,
    private router: Router, private loadingSevrice: LoadingService, private title: Title,
    private activatedRoute: ActivatedRoute) {
    this.title.setTitle('Subscription Page')
  }

  async ngOnInit(): Promise<void> {
    const { type } = await firstValueFrom(this.activatedRoute.params)
    this.writeType = type
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
    if (this.writeType == 'new') {
      this.userId = this.loginService.getData()?.data?.id

      const result = await firstValueFrom(this.subscriptionService.getByUser(this.userId))
      if (result.data?.id) {
        this.subUpdate.id = result.data?.id
        this.subUpdate.priceId = priceId
        this.subUpdate.version = result.data?.version
        this.subUpdate.isActive = result.data?.isActive

        const resultInsertSubscription = await firstValueFrom(this.subscriptionService.update(this.subUpdate))
        if (resultInsertSubscription) {
          this.login.data.roleCode = 'R02'
          this.loginService.saveData(this.login)
          this.router.navigateByUrl('/member/profile-update')
        }
      } else {
        const resultProfileById = await firstValueFrom(this.profileService.getByUserId())
        this.profileId = resultProfileById.data?.id

        this.subInsert.profileId = this.profileId
        this.subInsert.priceId = priceId

        const resultInsertSubscription = await firstValueFrom(this.subscriptionService.insert(this.subInsert))
        if (resultInsertSubscription) {
          if (resultInsertSubscription) {
            this.login.data.roleCode = 'R02'
            this.loginService.saveData(this.login)
            this.router.navigateByUrl('/member/profile-update')
          }
        }
      }
    } else if (this.writeType == 'add') {
      this.userId = this.loginService.getData()?.data?.id

      const result = await firstValueFrom(this.subscriptionService.getByUser(this.userId))

      this.subUpdate.id = result.data?.id
      this.subUpdate.priceId = priceId
      this.subUpdate.version = result.data?.version
      this.subUpdate.isActive = result.data?.isActive

      const resultInsertSubscription = await firstValueFrom(this.subscriptionService.update(this.subUpdate))
      if (resultInsertSubscription) {
        if (resultInsertSubscription) {
          this.login.data.roleCode = 'R02'
          this.loginService.saveData(this.login)
          this.router.navigateByUrl('/member/profile-update')
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe()
  }

}
