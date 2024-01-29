import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  @Input() title: string;
  @Input() company: string;
  @Input() location: string;
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() description: string;

  constructor() { }

  ngOnInit(): void {
  }

}
