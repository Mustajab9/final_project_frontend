import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { Subscription, firstValueFrom } from 'rxjs'

import { GetAllEnrollEventDtoDataRes } from '../../../../../../core/src/app/dto/enroll-event/get-all-enroll-event-dto-data-res'
import { UpdateEnrollEventDtoReq } from '../../../../../../core/src/app/dto/enroll-event/update-enroll-event-dto-req'
import { GetByEventIdDtoDataRes } from '../../../../../../core/src/app/dto/event/get-by-event-id-dto-data-res'
import { EnrollEventService } from '../../../../../../core/src/app/service/enroll-event.service'
import { EventService } from '../../../../../../core/src/app/service/event.service'
import { LoginService } from '../../../../../../core/src/app/service/login.service'

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit, OnDestroy {

  data: GetAllEnrollEventDtoDataRes[] = []
  updateReq: UpdateEnrollEventDtoReq = new UpdateEnrollEventDtoReq()
  eventData: GetByEventIdDtoDataRes = new GetByEventIdDtoDataRes()
  userId: string | undefined = this.loginService.getData()?.data.id

  activatedRouteSubscription?: Subscription
  updateEnrollEventSubscription?: Subscription
  getByEnrollEventIdSubscription?: Subscription

  constructor(private title: Title, private activatedRoute: ActivatedRoute, private loginService: LoginService,
    private eventService: EventService, private enrollService: EnrollEventService) {
    this.title.setTitle("Participant Event")
  }

  ngOnInit(): void {
    this.initData()
  }

  async initData(): Promise<void> {
    const {id} = await firstValueFrom(this.activatedRoute.params)
    const allResult = await firstValueFrom(this.enrollService.getAll())
    if (allResult) {
      this.data = allResult.data.filter(comp => comp.eventId == id)
    }

    const resultEventById = await firstValueFrom(this.eventService.getById(id))
    if (resultEventById) {
      this.eventData.id = id
      this.eventData = resultEventById.data
    }
  }

  async onApprove(id: string): Promise<void> {
    const resultEnrollEventById = await firstValueFrom(this.enrollService.getById(id))
    if (resultEnrollEventById) {
      this.updateReq.isApprove = true
      this.updateReq.id = resultEnrollEventById.data?.id
      this.updateReq.version = resultEnrollEventById.data?.version
      this.updateReq.isActive = resultEnrollEventById.data?.isActive

      const resultUpdate = await firstValueFrom(this.enrollService.update(this.updateReq))
      if (resultUpdate) {
        this.initData()
      }
    }
  }

  ngOnDestroy(): void {
    this.updateEnrollEventSubscription?.unsubscribe()
  }
}