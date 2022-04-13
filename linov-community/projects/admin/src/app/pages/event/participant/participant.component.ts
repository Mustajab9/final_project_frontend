import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'

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

  getAllEventParticipantSubscription?: Subscription
  activatedRouteSubscription?: Subscription
  getByEventIdSubscription?: Subscription
  updateEnrollEventSubscription?: Subscription
  getByEnrollEventIdSubscription?: Subscription

  constructor(private title: Title, private activatedRoute: ActivatedRoute, private loginService: LoginService,
    private eventService: EventService, private enrollService: EnrollEventService) {
    this.title.setTitle("Participant Event")
  }

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result => {
      const id = (result as any).id

      this.getAllEventParticipantSubscription = this.enrollService.getAll().subscribe(result => {
        if (result) {
          this.data = result.data.filter(comp => comp.eventId == id)
        }
      })

      this.getByEventIdSubscription = this.eventService.getById(id).subscribe(result => {
        if (result) {
          this.eventData.id = id
          this.eventData = result.data
        }
      })
    })
  }

  onApprove(id: string): void {
    this.getByEnrollEventIdSubscription = this.enrollService.getById(id).subscribe(result => {
      if (result) {
        this.updateReq.isApprove = true
        this.updateReq.id = result.data?.id
        this.updateReq.version = result.data?.version
        this.updateReq.isActive = result.data?.isActive

        this.updateEnrollEventSubscription = this.enrollService.update(this.updateReq).subscribe(result => {
          if (result) {
            this.initData()
          }
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.getAllEventParticipantSubscription?.unsubscribe()
    this.updateEnrollEventSubscription?.unsubscribe()
  }

}
