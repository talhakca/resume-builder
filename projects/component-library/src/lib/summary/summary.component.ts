import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  @Input() description: string;

  constructor() { }

  ngOnInit(): void {
  }

}
