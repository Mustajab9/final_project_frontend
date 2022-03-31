import { Component, OnInit } from '@angular/core';
import { MenuItem, MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[] = [];
  countries: any[] = [];
  selectedCity1: any;
  visibleSidebar1: any;

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Dashboard',
        icon : 'pi pi-home'
      },
      {
        label: 'Thread',
        icon : 'pi pi-th-large'
      },
      {
        label: 'Course',
        icon : 'pi pi-book'
      },
      {
        label: 'Event',
        icon : 'pi pi-calendar'
      }
    ]
  }

}
