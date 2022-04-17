import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import { firstValueFrom, Subscription } from 'rxjs'

import { InsertEnrollEventDtoReq } from '../../../../../../core/src/app/dto/enroll-event/insert-enroll-event-dto-req'
import { GetByEventIdDtoDataRes } from '../../../../../../core/src/app/dto/event/get-by-event-id-dto-data-res'
import { GetAllPaymentMethodDtoDataRes } from '../../../../../../core/src/app/dto/payment-method/get-all-payment-method-dto-data-res'
import { EnrollEventService } from '../../../../../../core/src/app/service/enroll-event.service'
import { EventService } from '../../../../../../core/src/app/service/event.service'
import { LoadingService } from '../../../../../../core/src/app/service/loading.service'
import { PaymentMethodService } from '../../../../../../core/src/app/service/payment-method.service'

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
  isLoading: boolean = false

  loadingServiceSubscription?: Subscription

  constructor(private title: Title, private router: Router, private activatedRoute: ActivatedRoute, private eventService: EventService,
    private enrollService: EnrollEventService, private paymentService: PaymentMethodService, private loadingService: LoadingService) {
    this.title.setTitle('Enroll Event')
  }

  async ngOnInit() {
    this.loadingService.loading$?.subscribe(result =>{
      this.isLoading = result
    })

    const {id} = await firstValueFrom(this.activatedRoute.params)
    this.data.eventId = id

    const resultByEventId = await firstValueFrom(this.eventService.getById(id))
    if (resultByEventId) {
      this.eventData.eventTitle = resultByEventId.data.eventTitle
      this.eventData.eventProvider = resultByEventId.data.eventProvider
      this.eventData.eventLocation = resultByEventId.data.eventLocation
      this.eventData.eventPrice = resultByEventId.data.eventPrice
    }

    const resultAllPaymentMethod = await firstValueFrom(this.paymentService.getAll())
    if (resultAllPaymentMethod) {
      this.paymentData = resultAllPaymentMethod.data
    }
  }

  changeFile(event: any): void {
    this.file = event.target.files[0]
  }

  async onSubmit(isValid: boolean) {
    if (isValid) {
      await firstValueFrom(this.enrollService.insert(this.data, this.file))
      this.router.navigateByUrl('/member/course')
    }
  }

  ngOnDestroy(): void {
    this.loadingServiceSubscription?.unsubscribe()
  }
}
