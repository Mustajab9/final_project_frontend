import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { GetAllSubscriptionDtoDataRes } from 'projects/core/src/app/dto/subscription/get-all-subscription-dto-data-res';
import { SubscriptionService } from 'projects/core/src/app/service/subscription.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit, OnDestroy {

  data: GetAllSubscriptionDtoDataRes[] = []

  getAllProfileSubscription?: Subscription
  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private title: Title, private router: Router, private store: Store, private confirmationService: ConfirmationService,
              private subscriptionService: SubscriptionService) {
    this.title.setTitle('Profile Subscription')
  }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage, query?: string): void {
    this.loading = true;

    this.getAllProfileSubscription = this.subscriptionService.getAll(startPage, maxPage, query).subscribe({
      next: result => {
        this.data = result.data
        this.loading = false
        this.totalRecords = result.total
      },
      error: _ => this.loading = false
    })
  }

  clear(table: Table): void {
    table.clear();
  }

  filter(text: any): void {
    this.data = this.data.filter(d => {
      return d.SubscriptionCode?.includes(text) || d.profileName?.includes(text) || d.email?.includes(text) || d.profileCompany?.includes(text)
    })
  }

  ngOnDestroy(): void {
    this.getAllProfileSubscription?.unsubscribe
  }

}
