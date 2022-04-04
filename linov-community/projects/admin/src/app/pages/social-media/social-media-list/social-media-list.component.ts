import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { GetAllSocialMediaDtoDataRes } from 'projects/core/src/app/dto/social-media/get-all-social-media-dto-data-res';
import { SocialMediaService } from 'projects/core/src/app/service/social-media.service';

@Component({
  selector: 'app-social-media-list',
  templateUrl: './social-media-list.component.html',
  styleUrls: ['./social-media-list.component.css']
})
export class SocialMediaListComponent implements OnInit {

  data: GetAllSocialMediaDtoDataRes[] = []

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private socialMediaService: SocialMediaService) { }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage, query: string): void {
    this.loading = true;

    startPage = startPage != 0 ? (startPage / this.maxPage) + 1 : startPage

    this.socialMediaService.getAll(query, startPage, maxPage).subscribe({
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
      return d.socialMediaCode?.includes(text) || d.socialMediaName?.toString().includes(text)
    })
  }

  update(id: number): void {

  }

  deleteById(id: number): void {

  }

}
