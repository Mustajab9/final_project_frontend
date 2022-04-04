import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { GetAllUserDtoDataRes } from 'projects/core/src/app/dto/user/get-all-user-dto-data-res';
import { UserService } from 'projects/core/src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  data: GetAllUserDtoDataRes[] = []

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage, query: string): void {
    this.loading = true;

    startPage = startPage != 0 ? (startPage / this.maxPage) + 1 : startPage

    this.userService.getAll(query, startPage, maxPage).subscribe({
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
      return d.username?.includes(text) || d.roleName?.toString().includes(text)
    })
  }

  update(id: number): void {

  }

  deleteById(id: number): void {

  }

}
