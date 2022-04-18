import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'

import { firstValueFrom, Observable, Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { GetAllEnrollEventDtoDataRes } from '../../../../../../core/src/app/dto/enroll-event/get-all-enroll-event-dto-data-res'
import { UpdateEnrollEventDtoReq } from '../../../../../../core/src/app/dto/enroll-event/update-enroll-event-dto-req'
import { GetByEventIdDtoDataRes } from '../../../../../../core/src/app/dto/event/get-by-event-id-dto-data-res'
import { EnrollEventService } from '../../../../../../core/src/app/service/enroll-event.service'
import { EventService } from '../../../../../../core/src/app/service/event.service'
import { LoadingService } from '../../../../../../core/src/app/service/loading.service'
import { enrollEventSelectorAll } from '../../../../../../core/src/app/state/enroll-event/enroll-event.selector'

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit, OnDestroy {

  data: GetAllEnrollEventDtoDataRes[] = []
  data$: Observable<GetAllEnrollEventDtoDataRes[]> = this.store.select(enrollEventSelectorAll)
  updateReq: UpdateEnrollEventDtoReq = new UpdateEnrollEventDtoReq()
  eventData: GetByEventIdDtoDataRes = new GetByEventIdDtoDataRes()
  writeType!: string
  isLoading: boolean = false
  loadingSubscription?: Subscription

  constructor(private title: Title, private activatedRoute: ActivatedRoute, private store: Store, private router: Router,
    private eventService: EventService, private enrollService: EnrollEventService, private loadingService: LoadingService) {
    this.title.setTitle("Participant Event")
  }

  ngOnInit(): void {
    this.initData()
  }

  async initData(): Promise<void> {
    this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })

    const {id, type} = await firstValueFrom(this.activatedRoute.params)
    this.writeType = type

    const resultAll = await firstValueFrom(this.enrollService.getAll())
    if (resultAll) {
      this.data = resultAll.data.filter(comp => comp.eventId == id)
    }

    const resultById = await firstValueFrom(this.eventService.getById(id))
    if (resultById) {
      this.eventData = resultById.data
      this.eventData.id = id
    }
  }

  async onApprove(id: string): Promise<void> {
    const resultEnrollById = await firstValueFrom(this.enrollService.getById(id))
    if (resultEnrollById) {
      this.updateReq.isApprove = true
      this.updateReq.id = resultEnrollById.data?.id
      this.updateReq.version = resultEnrollById.data?.version
      this.updateReq.isActive = resultEnrollById.data?.isActive
    }

    const resultUpdateEnroll = await firstValueFrom(this.enrollService.update(this.updateReq))
    if (resultUpdateEnroll) {
      this.initData()
    }
  }

  onBack(): void{
    if(this.writeType == 'event-list'){
      this.router.navigateByUrl("/member/event/list")
    }else if(this.writeType == 'event-all'){
      this.router.navigateByUrl("member/course")
    }
  }

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe()
  }
}
