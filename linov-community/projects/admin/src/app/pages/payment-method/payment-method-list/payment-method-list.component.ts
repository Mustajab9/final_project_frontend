import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { GetAllPaymentMethodDtoDataRes } from 'projects/core/src/app/dto/payment-method/get-all-payment-method-dto-data-res';
import { PaymentMethodService } from 'projects/core/src/app/service/payment-method.service';

@Component({
  selector: 'app-payment-method-list',
  templateUrl: './payment-method-list.component.html',
  styleUrls: ['./payment-method-list.component.css']
})
export class PaymentMethodListComponent implements OnInit {
  
  data: GetAllPaymentMethodDtoDataRes[] = []

  maxPage : number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private paymentMethodService: PaymentMethodService) { }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  getData(startPage : number = 0, maxPage : number = this.maxPage, query: string) : void {
    this.loading = true;

    startPage = startPage != 0 ? (startPage / this.maxPage) + 1 : startPage

    this.paymentMethodService.getAll(query, startPage, maxPage).subscribe({
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
      return d.paymentCode?.includes(text) || d.paymentName?.toString().includes(text)
    })
  }
}
