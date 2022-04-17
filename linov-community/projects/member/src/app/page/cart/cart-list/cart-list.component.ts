import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { firstValueFrom, Subscription } from 'rxjs'

import { GetAllEventDtoDataRes } from '../../../../../../core/src/app/dto/event/get-all-event-dto-data-res'
import { CheckOutService } from '../../../../../../core/src/app/service/checkout.service'
import { EventService } from '../../../../../../core/src/app/service/event.service'
import { LoginService } from '../../../../../../core/src/app/service/login.service'

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  data: GetAllEventDtoDataRes[] = []
  selectedEvent: GetAllEventDtoDataRes[] = []

  userId?: string = this.loginService.getData()?.data.id

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private title: Title, private router: Router, private eventService: EventService,
    private checkoutService: CheckOutService, private loginService: LoginService) {
    this.title.setTitle("Cart Event List")
  }

  async ngOnInit(): Promise<void> {
    const resultAll = await firstValueFrom(this.eventService.getEventNotPaid(this.userId))
    if (resultAll) {
      this.data = resultAll.data
    }
  }

  onSubmit() {
    this.checkoutService.addCart(this.selectedEvent)
    this.router.navigateByUrl('member/cart/checkout')
  }

}
