import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'

import { GetAllIndustryDtoDataRes } from '../../../../../../core/src/app/dto/industry/get-all-industry-dto-data-res'
import { GetAllPositionDtoDataRes } from '../../../../../../core/src/app/dto/position/get-all-position-dto-data-res'
import { GetProfileSosmedByUserDtoDataRes } from '../../../../../../core/src/app/dto/profile-sosmed/get-profile-sosmed-by-user-dto-data-res'
import { InsertProfileSosmedDtoReq } from '../../../../../../core/src/app/dto/profile-sosmed/insert-profile-sosmed-dto-req'
import { UpdateProfileSosmedDtoReq } from '../../../../../../core/src/app/dto/profile-sosmed/update-profile-sosmed-dto-req'
import { GetProfileByUserDtoDataRes } from '../../../../../../core/src/app/dto/profiles/get-profile-by-user-dto-data-res'
import { UpdateProfilesDtoReq } from '../../../../../../core/src/app/dto/profiles/update-profiles-dto-req'
import { GetAllProvinceDtoDataRes } from '../../../../../../core/src/app/dto/province/get-all-province-dto-data-res'
import { GetAllRegencyDtoDataRes } from '../../../../../../core/src/app/dto/regency/get-all-regency-dto-data-res'
import { GetAllSocialMediaDtoDataRes } from '../../../../../../core/src/app/dto/social-media/get-all-social-media-dto-data-res'
import { GetAllSubscriptionDtoDataRes } from '../../../../../../core/src/app/dto/subscription/get-all-subscription-dto-data-res'
import { ChangePasswordDtoReq } from '../../../../../../core/src/app/dto/user/change-password-dto-req'
import { LoginDtoRes } from '../../../../../../core/src/app/dto/user/login-dto-res'
import { IndustryService } from '../../../../../../core/src/app/service/industry.service'
import { LoadingService } from '../../../../../../core/src/app/service/loading.service'
import { LoginService } from '../../../../../../core/src/app/service/login.service'
import { PositionService } from '../../../../../../core/src/app/service/position.service'
import { ProfileSosmedService } from '../../../../../../core/src/app/service/profile-sosmed.service'
import { ProfilesService } from '../../../../../../core/src/app/service/profiles.service'
import { ProvinceService } from '../../../../../../core/src/app/service/province.service'
import { RegencyService } from '../../../../../../core/src/app/service/regency.service'
import { SocialMediaService } from '../../../../../../core/src/app/service/social-media.service'
import { SubscriptionService } from '../../../../../../core/src/app/service/subscription.service'
import { UserService } from '../../../../../../core/src/app/service/user.service'

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit, OnDestroy {

  data: ChangePasswordDtoReq = new ChangePasswordDtoReq()

  dataLogin: LoginDtoRes | null = this.loginService.getData()
  filterTimeout: any
  newPass!: string
  confirmationPass!: string
  isFound: boolean = false
  getUserByEmailSubscription?: Subscription
  changePasswordSubscription?: Subscription
  roleCode?: string
  subscriptionDuration?: string
  isLoading: boolean = false
  uploadedFiles: any[] = []

  subscriptions: GetAllSubscriptionDtoDataRes[] = []
  profileSosmed: GetProfileSosmedByUserDtoDataRes[] = []
  provinces: GetAllProvinceDtoDataRes[] = []
  regencies: GetAllRegencyDtoDataRes[] = []
  industries: GetAllIndustryDtoDataRes[] = []
  positions: GetAllPositionDtoDataRes[] = []
  socialMedias: GetAllSocialMediaDtoDataRes[] = []

  insertProfileSocmed: InsertProfileSosmedDtoReq = new InsertProfileSosmedDtoReq()
  updateProfileSocmed: UpdateProfileSosmedDtoReq = new UpdateProfileSosmedDtoReq()
  updateProfile: UpdateProfilesDtoReq = new UpdateProfilesDtoReq()
  profile: GetProfileByUserDtoDataRes = new GetProfileByUserDtoDataRes()

  profileSubscription?: Subscription
  profileSosmedSubscription?: Subscription
  provincesSubscription?: Subscription
  regenciesSubscription?: Subscription
  industriesSubscription?: Subscription
  positionsSubscription?: Subscription
  socialMediasSubscription?: Subscription
  insertProfileSocmedSubscription?: Subscription
  updateProfileSubscription?: Subscription
  getSubscriptionByProfileSubscription?: Subscription

  constructor(private title: Title, private router: Router,
    private profileService: ProfilesService, private profileSosmedService: ProfileSosmedService,
    private provinceService: ProvinceService, private regencyService: RegencyService,
    private industryService: IndustryService, private positionService: PositionService,
    private socialMediaService: SocialMediaService, private loginService: LoginService,
    private subscriptionService: SubscriptionService, private userService: UserService,
    private loadingService: LoadingService) {
    this.title.setTitle('Update Profile')
  }

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })

    this.profileSubscription = this.profileService.getByUserId().subscribe(result => {
      this.profile = result.data
      this.updateProfile.id = result.data.id
      this.updateProfile.industryId = result.data.industryId
      this.updateProfile.positionId = result.data.positionId
      this.updateProfile.profileCompany = result.data.profileCompany
      this.updateProfile.profileName = result.data.profileName
      this.updateProfile.provinceId = result.data.provinceId
      this.updateProfile.regencyId = result.data.regencyId
      this.updateProfile.isActive = result.data.isActive
      this.updateProfile.version = result.data.version
      this.roleCode = result.data.roleCode

      this.getSubscriptionByProfileSubscription = this.subscriptionService.getByUser(result.data.userId).subscribe(result => {
        if (result) {
          this.subscriptionDuration = result.data?.subscriptionDuration
        }
      })
    })

    this.profileSosmedSubscription = this.profileSosmedService.getByUser().subscribe(result => {
      this.profileSosmed = result.data
    })

    this.provincesSubscription = this.provinceService.getAll().subscribe(result => {
      this.provinces = result.data
    })

    this.industriesSubscription = this.industryService.getAll().subscribe(result => {
      this.industries = result.data
    })

    this.positionsSubscription = this.positionService.getAll().subscribe(result => {
      this.positions = result.data
    })

    this.socialMediasSubscription = this.socialMediaService.getAll().subscribe(result => {
      this.socialMedias = result.data
    })

    const id: string | undefined = this.dataLogin?.data.id
    this.getUserByEmailSubscription = this.userService.getById(id).subscribe(result => {
      if (result) {
        this.data.id = result.data?.id
        this.data.email = result.data.username
        this.data.roleId = result.data?.roleId
        this.data.isActive = result.data?.isActive
        this.data.version = result.data?.version
      }
    })
  }

  onBasicUpload(event: any) {
    this.uploadedFiles[0] = event.currentFiles[0]
  }

  provinceChange(id: string): void {
    this.regenciesSubscription = this.regencyService.getByProvince(id).subscribe(result => {
      this.regencies = result.data
    })
  }

  onSave(): void {
    const profileId: string | undefined = this.loginService.getData()?.data.id
    for (let sosmed of this.profileSosmed) {
      if (sosmed.accountName) {
        if (sosmed.id) {
          this.updateProfileSocmed.id = sosmed.id
          this.updateProfileSocmed.accountName = sosmed.accountName
          this.updateProfileSocmed.version = sosmed.version
          this.updateProfileSocmed.isActive = sosmed.isActive
          this.profileSosmedService.update(this.updateProfileSocmed).subscribe()
        } else {
          let id: string
          this.profileService.getByUserId().subscribe(result => {
            id = result.data.id

            this.insertProfileSocmed.profileId = id
            this.insertProfileSocmed.accountName = sosmed.accountName
            this.insertProfileSocmed.socialMediaId = sosmed.socialMediaid
            this.profileSosmedService.insert(this.insertProfileSocmed).subscribe()
          })
        }
      }
    }

    this.updateProfileSubscription = this.profileService.update(this.updateProfile, this.uploadedFiles[0]).subscribe(_ => this.initData())
  }

  changePassword() {
    if (this.filterTimeout) {
      clearTimeout(this.filterTimeout)
    }

    this.filterTimeout = setTimeout(() => {
      if (this.newPass == this.confirmationPass) {
        this.data.newPassword = this.newPass
        this.isFound = true
      } else {
        this.isFound = false
      }
    }, 1000)
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      this.changePasswordSubscription = this.userService.changePassword(this.data).subscribe(result => {
        if (result) {
          this.initData()
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.profileSubscription?.unsubscribe()
    this.profileSosmedSubscription?.unsubscribe()
    this.provincesSubscription?.unsubscribe()
    this.regenciesSubscription?.unsubscribe()
    this.industriesSubscription?.unsubscribe()
    this.positionsSubscription?.unsubscribe()
    this.socialMediasSubscription?.unsubscribe()
    this.insertProfileSocmedSubscription?.unsubscribe()
    this.updateProfileSubscription?.unsubscribe()
    this.getUserByEmailSubscription?.unsubscribe()
    this.changePasswordSubscription?.unsubscribe()
  }
}
