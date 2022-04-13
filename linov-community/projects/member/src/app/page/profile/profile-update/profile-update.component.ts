import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { GetAllIndustryDtoDataRes } from 'projects/core/src/app/dto/industry/get-all-industry-dto-data-res';
import { GetAllPositionDtoDataRes } from 'projects/core/src/app/dto/position/get-all-position-dto-data-res';
import { GetProfileSosmedByUserDtoDataRes } from 'projects/core/src/app/dto/profile-sosmed/get-profile-sosmed-by-user-dto-data-res';
import { InsertProfileSosmedDtoReq } from 'projects/core/src/app/dto/profile-sosmed/insert-profile-sosmed-dto-req';
import { UpdateProfileSosmedDtoReq } from 'projects/core/src/app/dto/profile-sosmed/update-profile-sosmed-dto-req';
import { GetProfileByUserDtoDataRes } from 'projects/core/src/app/dto/profiles/get-profile-by-user-dto-data-res';
import { UpdateProfilesDtoReq } from 'projects/core/src/app/dto/profiles/update-profiles-dto-req';
import { GetAllProvinceDtoDataRes } from 'projects/core/src/app/dto/province/get-all-province-dto-data-res';
import { GetAllRegencyDtoDataRes } from 'projects/core/src/app/dto/regency/get-all-regency-dto-data-res';
import { GetAllSocialMediaDtoDataRes } from 'projects/core/src/app/dto/social-media/get-all-social-media-dto-data-res';
import { IndustryService } from 'projects/core/src/app/service/industry.service';
import { LoginService } from 'projects/core/src/app/service/login.service';
import { PositionService } from 'projects/core/src/app/service/position.service';
import { ProfileSosmedService } from 'projects/core/src/app/service/profile-sosmed.service';
import { ProfilesService } from 'projects/core/src/app/service/profiles.service';
import { ProvinceService } from 'projects/core/src/app/service/province.service';
import { RegencyService } from 'projects/core/src/app/service/regency.service';
import { SocialMediaService } from 'projects/core/src/app/service/social-media.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  profile: GetProfileByUserDtoDataRes = new GetProfileByUserDtoDataRes()
  profileSosmed: GetProfileSosmedByUserDtoDataRes[] = []
  provinces: GetAllProvinceDtoDataRes[] = []
  regencies: GetAllRegencyDtoDataRes[] =[]
  industries: GetAllIndustryDtoDataRes[] = []
  positions: GetAllPositionDtoDataRes[] = []
  socialMedias: GetAllSocialMediaDtoDataRes[] = []
  insertProfileSocmed: InsertProfileSosmedDtoReq = new InsertProfileSosmedDtoReq()
  updateProfileSocmed: UpdateProfileSosmedDtoReq = new UpdateProfileSosmedDtoReq()
  updateProfile: UpdateProfilesDtoReq = new UpdateProfilesDtoReq()
  profileSubscription?: Subscription
  profileSosmedSubscription?: Subscription
  provincesSubscription?: Subscription
  regenciesSubscription?: Subscription
  industriesSubscription?: Subscription
  positionsSubscription?: Subscription
  socialMediasSubscription?: Subscription
  insertProfileSocmedSubscription?: Subscription
  updateProfileSubscription?: Subscription

  constructor(private title: Title, private router: Router,
    private profileService: ProfilesService, private profileSosmedService: ProfileSosmedService,
    private provinceService: ProvinceService, private regencyService: RegencyService,
    private industryService: IndustryService, private positionService: PositionService,
    private socialMediaService: SocialMediaService, private loginService: LoginService,
    private activatedRoute: ActivatedRoute) { 
      this.title.setTitle('Update Profile')
    }

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.profileSubscription = this.profileService.getByUserId().subscribe(result => {
      this.profile = result.data
      this.updateProfile.id = result.data.id
      this.updateProfile.industryId = result.data.industryId
      this.updateProfile.positionId = result.data.positionId
      this.updateProfile.profileCompany = result.data.profileCompany
      this.updateProfile.profileName = result.data.profileName
      this.updateProfile.regencyId = result.data.regencyId
      this.updateProfile.isActive = result.data.isActive
      this.updateProfile.version = result.data.version
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
  }

  provinceChange(id: string): void {
    this.regenciesSubscription = this.regencyService.getByProvince(id).subscribe(result => {
      this.regencies = result.data
    })
  }

  onSave(): void {
    const profileId: string | undefined = this.loginService.getData()?.data.id
    console.log(profileId)
    for(let sosmed of this.profileSosmed) {
      if(sosmed.id) {
        this.updateProfileSocmed.id = sosmed.id
        this.updateProfileSocmed.accountName = sosmed.accountName
        this.updateProfileSocmed.version = sosmed.version
        this.updateProfileSocmed.isActive = sosmed.isActive
        this.profileSosmedService.update(this.updateProfileSocmed).subscribe()
      }else {
        let id: string
        this.profileService.getByUserId().subscribe(result => {
          id = result.data.id
          
          this.insertProfileSocmed.profileId = id
          this.insertProfileSocmed.accountName = sosmed.accountName
          this.insertProfileSocmed.socialMediaId = sosmed.socialMediaid
          this.profileSosmedService.insert(this.insertProfileSocmed).subscribe(_ => {
            this.router.navigateByUrl('/member/dashboard')
          })
        })
        
      }
    }

    this.updateProfileSubscription = this.profileService.update(this.updateProfile).subscribe(result => {
      // this.router.navigateByUrl('/member/thread')
    })
  }

}
