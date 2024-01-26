import { Component, Input, OnInit } from '@angular/core';
import { HeadingType } from '../shared/enums/heading-type.enum';

@Component({
  selector: 'lib-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent implements OnInit {

  @Input() type!: HeadingType;
  @Input() content!: string;

  HeadingType = HeadingType;

  constructor() { }

  ngOnInit(): void {
  }

}
