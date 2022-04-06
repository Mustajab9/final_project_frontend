import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { GetAllUserDtoDataRes } from '../../../../../../core/src/app/dto/user/get-all-user-dto-data-res';
import { UserService } from '../../../../../../core/src/app/service/user.service';
import { deleteUserAction } from '../../../../../../core/src/app/state/user/user.action';
import { Subscription } from 'rxjs';
import { userSelectorDelete } from '../../../../../../core/src/app/state/user/user.selector';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  data: GetAllUserDtoDataRes[] = []

  getAllUserSubscription?: Subscription
  userDeleteSubscription?: Subscription
  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private title: Title, private router: Router, private store: Store, private confirmationService: ConfirmationService,
              private userService: UserService) {
      this.title.setTitle('User List')
  }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage, query?: string): void {
    this.loading = true;

    this.getAllUserSubscription = this.userService.getAll(startPage, maxPage, query).subscribe({
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
    this.router.navigateByUrl(`/admin/user/${id}`)
  }

  deleteProgress(): void {
    this.userDeleteSubscription = this.store.select(userSelectorDelete).subscribe(result => {
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
          this.store.dispatch(deleteUserAction({ payload: id }))
          this.deleteProgress()
      }
    });
  }

  ngOnDestroy(): void {
    this.getAllUserSubscription?.unsubscribe
    this.userDeleteSubscription?.unsubscribe
  }

}
