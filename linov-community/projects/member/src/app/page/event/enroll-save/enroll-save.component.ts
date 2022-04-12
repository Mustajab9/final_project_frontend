import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { InsertEnrollEventDtoReq } from 'projects/core/src/app/dto/enroll-event/insert-enroll-event-dto-req';
import { GetByEventIdDtoDataRes } from 'projects/core/src/app/dto/event/get-by-event-id-dto-data-res';
import { GetAllPaymentMethodDtoDataRes } from 'projects/core/src/app/dto/payment-method/get-all-payment-method-dto-data-res';
import { EnrollEventService } from 'projects/core/src/app/service/enroll-event.service';
import { EventService } from 'projects/core/src/app/service/event.service';
import { PaymentMethodService } from 'projects/core/src/app/service/payment-method.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-enroll-save',
  templateUrl: './enroll-save.component.html',
  styleUrls: ['./enroll-save.component.css']
})
export class EnrollSaveComponent implements OnInit, OnDestroy {

  data: InsertEnrollEventDtoReq = new InsertEnrollEventDtoReq()
  paymentData: GetAllPaymentMethodDtoDataRes[] = []
  eventData: GetByEventIdDtoDataRes = new GetByEventIdDtoDataRes()

  file?: File
  activatedRouteSubscription?: Subscription
  getAllPaymentMethodSubscription?: Subscription
  getByEventIdSubscription?: Subscription
  insertEnrollEventSubscription?: Subscription

  constructor(private title: Title, private router: Router, private activatedRoute: ActivatedRoute, private eventService: EventService,
              private enrollService: EnrollEventService, private paymentService: PaymentMethodService) {
    this.title.setTitle('Enroll Event')
  }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result => {
        const id = (result as any).id
        this.data.eventId = id
        this.getByEventIdSubscription = this.eventService.getById(id).subscribe(result => {
          if(result){
            this.eventData.eventTitle = result.data.eventTitle
            this.eventData.eventProvider = result.data.eventProvider
            this.eventData.eventLocation = result.data.eventLocation
            this.eventData.eventPrice = result.data.eventPrice
          }
        })
    })

    this.getAllPaymentMethodSubscription = this.paymentService.getAll().subscribe(result => {
      if(result){
        this.paymentData = result.data
      }
    })
  }

  changeFile(event: any): void {
    this.file = event.target.files[0]
  }

  onSubmit(isValid: boolean){
    if(isValid){
      this.insertEnrollEventSubscription = this.enrollService.insert(this.data, this.file).subscribe(result => {
        this.router.navigateByUrl('/member/course')
      })
    }
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe()
    this.getAllPaymentMethodSubscription?.unsubscribe()
    this.getByEventIdSubscription?.unsubscribe()
  }
}
