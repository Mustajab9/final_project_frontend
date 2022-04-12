import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GetAllEventDtoDataRes } from 'projects/core/src/app/dto/event/get-all-event-dto-data-res';
import { EventService } from 'projects/core/src/app/service/event.service';
import { LoginService } from 'projects/core/src/app/service/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-enroll-event',
  templateUrl: './enroll-event.component.html',
  styleUrls: ['./enroll-event.component.css']
})
export class EnrollEventComponent implements OnInit {

  data: GetAllEventDtoDataRes[] = []

  getAllEventSubscription?: Subscription
  userId!: string
  displayResponsive: boolean = false

  constructor(private title: Title, private eventService: EventService, private loginService: LoginService) {
    this.title.setTitle('Course & Event List')
  }

  ngOnInit(): void {
    this.userId = this.loginService.getData()!.data.id
    this.getAllEventSubscription = this.eventService.getByEnroll(this.userId).subscribe(result => {
      if (result) {
        this.data = result.data
      }
    })
  }

  show(){
    this.displayResponsive = true
  }

  ngOnDestroy(): void {
    this.getAllEventSubscription?.unsubscribe()
  }

}
