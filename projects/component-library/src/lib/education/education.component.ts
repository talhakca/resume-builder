import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  @Input() degree: string;
  @Input() school: string;
  @Input() location: string;
  @Input() startDate: Date;
  @Input() endDate: Date;

  constructor() { }

  ngOnInit(): void {
  }

}
