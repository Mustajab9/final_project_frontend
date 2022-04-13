import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { resultMemoize, Store } from '@ngrx/store';
import { GetAllEnrollEventDtoDataRes } from 'projects/core/src/app/dto/enroll-event/get-all-enroll-event-dto-data-res';
import { UpdateEnrollEventDtoReq } from 'projects/core/src/app/dto/enroll-event/update-enroll-event-dto-req';
import { GetByEventIdDtoDataRes } from 'projects/core/src/app/dto/event/get-by-event-id-dto-data-res';
import { UpdateEventDtoReq } from 'projects/core/src/app/dto/event/update-event-dto-req';
import { EnrollEventService } from 'projects/core/src/app/service/enroll-event.service';
import { EventService } from 'projects/core/src/app/service/event.service';
import { loadEnrollEventAction, updateEnrollEventAction } from 'projects/core/src/app/state/enroll-event/enroll-event.action';
import { enrollEventSelectorAll, enrollEventSelectorInit, enrollEventSelectorUpdate } from 'projects/core/src/app/state/enroll-event/enroll-event.selector';
import { eventSelectorById } from 'projects/core/src/app/state/event/event.selector';
import { Observable, Subscription } from 'rxjs';

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

  getAllEventParticipantSubscription?: Subscription
  activatedRouteSubscription?: Subscription
  getByEventIdSubscription?: Subscription
  updateEnrollEventSubscription?: Subscription
  getByEnrollEventIdSubscription?: Subscription

  constructor(private title: Title, private activatedRoute: ActivatedRoute, private store: Store, private router: Router,
    private eventService: EventService, private enrollService: EnrollEventService) {
    this.title.setTitle("Participant Event")
  }

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result => {
      this.writeType = (result as any).type
      const id = (result as any).id

      this.getAllEventParticipantSubscription = this.enrollService.getAll().subscribe(result => {
        if (result) {
          this.data = result.data.filter(comp => comp.eventId == id)
        }
      })

      this.getByEventIdSubscription = this.eventService.getById(id).subscribe(result => {
        console.log(result)
        if (result) {
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

  onBack(): void{
    if(this.writeType == 'event-list'){
      this.router.navigateByUrl("/member/event/list")
    }else if(this.writeType == 'event-all'){
      this.router.navigateByUrl("member/course")
    }
  }

  ngOnDestroy(): void {
    this.getAllEventParticipantSubscription?.unsubscribe()
    this.updateEnrollEventSubscription?.unsubscribe()
  }

}
