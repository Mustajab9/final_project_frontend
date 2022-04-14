import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { Subscription, firstValueFrom } from 'rxjs'
import { Store } from '@ngrx/store'

import { ConfirmationService, LazyLoadEvent } from 'primeng/api'
import { Table } from 'primeng/table'

import { GetAllSubscriptionDtoDataRes } from '../../../../../../core/src/app/dto/subscription/get-all-subscription-dto-data-res'
import { SubscriptionService } from '../../../../../../core/src/app/service/subscription.service'

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent {

  data: GetAllSubscriptionDtoDataRes[] = []

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private title: Title, private router: Router, private store: Store, private confirmationService: ConfirmationService,
    private subscriptionService: SubscriptionService) {
    this.title.setTitle('Profile Subscription')
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  async getData(startPage: number = 0, maxPage: number = this.maxPage, query?: string): Promise<void> {
    this.loading = true

    try {
      const resultAll = await firstValueFrom(this.subscriptionService.getAll(startPage, maxPage, query))
      this.data = resultAll.data
      this.loading = false
      this.totalRecords = resultAll.total
    }catch {
      this.loading = false
    }
  }

  clear(table: Table): void {
    table.clear()
  }

  filter(text: any): void {
    this.data = this.data.filter(d => {
      return d.SubscriptionCode?.includes(text) || d.profileName?.includes(text) || d.email?.includes(text) || d.profileCompany?.includes(text)
    })
  }
}
