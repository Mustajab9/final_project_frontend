import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GetAllEventDtoDataRes } from 'projects/core/src/app/dto/event/get-all-event-dto-data-res';
import { EventService } from 'projects/core/src/app/service/event.service';
import { LoginService } from 'projects/core/src/app/service/login.service';
import { firstValueFrom, Subscription } from 'rxjs';

@Component({
  selector: 'app-enroll-event',
  templateUrl: './enroll-event.component.html',
  styleUrls: ['./enroll-event.component.css']
})
export class EnrollEventComponent implements OnInit {

  data: GetAllEventDtoDataRes[] = []

  userId!: string
  displayResponsive: boolean = false

  constructor(private title: Title, private eventService: EventService, private loginService: LoginService) {
    this.title.setTitle('Course & Event List')
  }

  async ngOnInit() {
    this.userId = this.loginService.getData()!.data.id
    const resultAll = await firstValueFrom(this.eventService.getByEnroll(this.userId))
    if (resultAll) {
      this.data = resultAll.data
    }
  }

  show(){
    this.displayResponsive = true
  }
}
