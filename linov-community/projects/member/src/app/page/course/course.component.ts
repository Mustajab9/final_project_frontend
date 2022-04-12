import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { InsertEnrollEventDtoReq } from 'projects/core/src/app/dto/enroll-event/insert-enroll-event-dto-req';
import { GetAllEventDtoDataRes } from 'projects/core/src/app/dto/event/get-all-event-dto-data-res';
import { EnrollEventService } from 'projects/core/src/app/service/enroll-event.service';
import { EventService } from 'projects/core/src/app/service/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy {

  data: GetAllEventDtoDataRes[] = []

  getAllEventSubscription?: Subscription

  constructor(private title: Title, private router: Router, private eventService: EventService) {
    this.title.setTitle('Course & Event List')
  }

  ngOnInit(): void {
    this.getAllEventSubscription = this.eventService.getAll().subscribe(result => {
      if(result){
        this.data = result.data
      }
    })
  }

  onEnroll(id: string){
    this.router.navigateByUrl('/member/event/cart-enroll/:id')
  }

  ngOnDestroy(): void {
    this.getAllEventSubscription?.unsubscribe
  }

}
