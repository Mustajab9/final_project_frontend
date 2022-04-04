import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { GetAllEventTypeDtoDataRes } from 'projects/core/src/app/dto/event-type/get-all-event-type-dto-data-res';
import { EventTypeService } from 'projects/core/src/app/service/event-type.service';

@Component({
  selector: 'app-event-type-list',
  templateUrl: './event-type-list.component.html',
  styleUrls: ['./event-type-list.component.css']
})
export class EventTypeListComponent implements OnInit {

  data: GetAllEventTypeDtoDataRes[] = []

  maxPage : number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private eventTypeService: EventTypeService) { }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  getData(startPage : number = 0, maxPage : number = this.maxPage, query: string) : void {
    this.loading = true;

    startPage = startPage != 0 ? (startPage / this.maxPage) + 1 : startPage

    this.eventTypeService.getAll(query, startPage, maxPage).subscribe({
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
