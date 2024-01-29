import { Component, Input, OnInit } from '@angular/core';
import { DividerOrientation } from '../shared/enums/divider-orientation.enum';

@Component({
  selector: 'lib-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.css']
})
export class DividerComponent implements OnInit {

  @Input() text: string;
  @Input() orientation: DividerOrientation;

  constructor() { }

  ngOnInit(): void {
  }

}
