import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MegaMenuItem } from 'primeng/api';
import { EventService } from 'projects/core/src/app/service/event.service';
import { LoginService } from 'projects/core/src/app/service/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  items: MenuItem[] = [];
  countries: any[] = [];
  selectedCity1: any;
  visibleSidebar1: any;
  isLogin: boolean = this.loginService.isLogin()

  getCountEventNotPaidSubscription?: Subscription
  countNotPaid!: number

  constructor(private eventService: EventService, private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home'
      },
      {
        label: 'Thread',
        icon: 'pi pi-th-large'
      },
      {
        label: 'Course',
        icon: 'pi pi-book'
      },
      {
        label: 'Event',
        icon: 'pi pi-calendar'
      }
    ]

    if(this.isLogin){
      this.getCountEventNotPaidSubscription = this.eventService.getCountNotPaid().subscribe(result => {
        this.countNotPaid = result.countNotPaid
      })
    }
  }

  changePassword() {
    this.router.navigateByUrl('/member/change-password')
  }

  onClick(): void {
    this.loginService.clearData()
    this.router.navigateByUrl('/login/member')
  }

  ngOnDestroy(): void {
    this.getCountEventNotPaidSubscription?.unsubscribe()
  }

}
