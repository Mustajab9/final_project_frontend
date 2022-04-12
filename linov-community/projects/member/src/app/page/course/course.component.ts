import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GetAllEventDtoDataRes } from 'projects/core/src/app/dto/event/get-all-event-dto-data-res';
import { EventService } from 'projects/core/src/app/service/event.service';
import { LoginService } from 'projects/core/src/app/service/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy {

  data: GetAllEventDtoDataRes[] = []
  userId?: string = this.loginService.getData()?.data.id

  getAllEventSubscription?: Subscription
  insertEnrollEventSubscription?: Subscription

  constructor(private title: Title, private router: Router, private eventService: EventService,
              private loginService: LoginService) {
    this.title.setTitle('Course & Event List')
  }

  ngOnInit(): void {
    this.getAllEventSubscription = this.eventService.getByNotEnroll().subscribe(result => {
      if(result){
        this.data = result.data.filter(comp => comp.createdBy != this.userId)
      }
    })
  }

  onEnroll(id: string){
    this.router.navigateByUrl(`/member/event/${id}`)
  }

  ngOnDestroy(): void {
    this.getAllEventSubscription?.unsubscribe()
  }

}