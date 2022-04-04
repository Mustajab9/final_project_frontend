import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { GetAllThreadTypeDtoDataRes } from 'projects/core/src/app/dto/thread-type/get-all-thread-type-dto-data-res';
import { ThreadTypeService } from 'projects/core/src/app/service/thread-type.service';

@Component({
  selector: 'app-thread-type-list',
  templateUrl: './thread-type-list.component.html',
  styleUrls: ['./thread-type-list.component.css']
})
export class ThreadTypeListComponent implements OnInit {

  data: GetAllThreadTypeDtoDataRes[] = []

  maxPage : number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private threadTypeService: ThreadTypeService) { }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  getData(startPage : number = 0, maxPage : number = this.maxPage, query: string) : void {
    this.loading = true;

    startPage = startPage != 0 ? (startPage / this.maxPage) + 1 : startPage

    this.threadTypeService.getAll(query, startPage, maxPage).subscribe({
      next : result => {
        this.data = result.data
        this.loading = false
        this.totalRecords = result.total
      },
      error : _ => this.loading = false
    })
  }

  clear(table: Table) : void {
      table.clear();
  }

  filter(text : any) : void {
    this.data = this.data.filter(d => {
      return d.typeCode?.includes(text) || d.typeName?.toString().includes(text)
    })
  }

}
