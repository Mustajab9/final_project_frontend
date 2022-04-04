import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { GetAllIndustryDtoDataRes } from 'projects/core/src/app/dto/industry/get-all-industry-dto-data-res';
import { IndustryService } from 'projects/core/src/app/service/industry.service';

@Component({
  selector: 'app-industry-list',
  templateUrl: './industry-list.component.html',
  styleUrls: ['./industry-list.component.css']
})
export class IndustryListComponent implements OnInit {

  data: GetAllIndustryDtoDataRes[] = []

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private industryService: IndustryService) { }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage, query: string): void {
    this.loading = true;

    startPage = startPage != 0 ? (startPage / this.maxPage) + 1 : startPage

    this.industryService.getAll(query, startPage, maxPage).subscribe({
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
      return d.industryCode?.includes(text) || d.industryName?.toString().includes(text)
    })
  }

  update(id: number): void {

  }

  deleteById(id: number): void {

  }

}
