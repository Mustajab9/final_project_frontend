import { Component, OnInit } from '@angular/core';

interface Country {
  name: string,
  code: string
}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  countries: Country[] = [];
  selectedCountries: Country[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
