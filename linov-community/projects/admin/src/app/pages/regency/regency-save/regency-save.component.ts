import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { InsertRegencyDtoReq } from '../../../../../../core/src/app/dto/regency/insert-regency-dto-req'
import { insertRegencyAction } from '../../../../../../core/src/app/state/regency/regency.action'
import { regencySelectorInsert } from '../../../../../../core/src/app/state/regency/regency.selector'
import { GetAllProvinceDtoDataRes } from '../../../../../../core/src/app/dto/province/get-all-province-dto-data-res'
import { ProvinceService } from '../../../../../../core/src/app/service/province.service'
import { LoadingService } from '../../../../../../core/src/app/service/loading.service'

@Component({
  selector: 'app-regency-save',
  templateUrl: './regency-save.component.html',
  styleUrls: ['./regency-save.component.css']
})
export class RegencySaveComponent implements OnInit, OnDestroy {

  data: InsertRegencyDtoReq = new InsertRegencyDtoReq()
  isLoading: boolean = false

  provinceData: GetAllProvinceDtoDataRes[] = []

  regencyInsertSubscription?: Subscription
  getAllProvinceSubscription?: Subscription
  loadingServiceSubscription?: Subscription

  constructor(private title: Title, private router: Router, private store: Store,
    private provinceService: ProvinceService, private loadingService: LoadingService) {
    this.title.setTitle('Add Regency')
  }

  ngOnInit(): void {
    this.loadingServiceSubscription = this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })

    this.getAllProvinceSubscription = this.provinceService.getAll().subscribe(result => {
      if(result){
        this.provinceData = result.data
      }
    })
  }

  insertProgress(): void {
    this.regencyInsertSubscription = this.store.select(regencySelectorInsert).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/admin/regency/list')
      }
    })
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      this.store.dispatch(insertRegencyAction({ payload: this.data }))
      this.insertProgress()
    }
  }

  ngOnDestroy(): void {
    this.regencyInsertSubscription?.unsubscribe()
    this.getAllProvinceSubscription?.unsubscribe()
    this.loadingServiceSubscription?.unsubscribe()
  }
}
