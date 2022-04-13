import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { ConfirmationService, LazyLoadEvent } from 'primeng/api'
import { Table } from 'primeng/table'

import { GetAllSocialMediaDtoDataRes } from '../../../../../../core/src/app/dto/social-media/get-all-social-media-dto-data-res'
import { SocialMediaService } from '../../../../../../core/src/app/service/social-media.service'
import { deleteSocialMediaAction } from '../../../../../../core/src/app/state/social-media/social-media.action'
import { socialMediaSelectorDelete } from '../../../../../../core/src/app/state/social-media/social-media.selector'

@Component({
  selector: 'app-social-media-list',
  templateUrl: './social-media-list.component.html',
  styleUrls: ['./social-media-list.component.css']
})
export class SocialMediaListComponent implements OnInit, OnDestroy {

  data: GetAllSocialMediaDtoDataRes[] = []

  getAllSocialMediaSubscription?: Subscription
  socialMediaDeleteSubscription?: Subscription
  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private title: Title, private router: Router, private store: Store, private confirmationService: ConfirmationService,
              private socialMediaService: SocialMediaService) {
    this.title.setTitle('Social Media List')
  }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage, query?: string): void {
    this.loading = true

    this.getAllSocialMediaSubscription = this.socialMediaService.getAll(startPage, maxPage, query).subscribe({
      next: result => {
        this.data = result.data
        this.loading = false
        this.totalRecords = result.total
      },
      error: _ => this.loading = false
    })
  }

  clear(table: Table): void {
    table.clear()
  }

  filter(text: any): void {
    this.data = this.data.filter(d => {
      return d.socialMediaCode?.includes(text) || d.socialMediaName?.toString().includes(text)
    })
  }

  update(id: number): void {
    this.router.navigateByUrl(`/admin/social-media/${id}`)
  }

  deleteProgress(): void {
    this.socialMediaDeleteSubscription = this.store.select(socialMediaSelectorDelete).subscribe(result => {
      if (result) {
        this.getData(0, 10)
      }
    })
  }

  deleteById(id: string){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this data?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.store.dispatch(deleteSocialMediaAction({ payload: id }))
          this.deleteProgress()
      }
    })
  }

  ngOnDestroy(): void {
    this.getAllSocialMediaSubscription?.unsubscribe()
    this.socialMediaDeleteSubscription?.unsubscribe()
  }

}
