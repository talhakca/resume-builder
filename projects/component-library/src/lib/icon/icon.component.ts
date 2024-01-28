import { Component, Input, OnInit } from '@angular/core';
import { IconTheme } from '../shared/enums/icon-theme.enum';
@Component({
  selector: 'lib-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {

  @Input() name: string;
  @Input() theme: IconTheme;

  constructor() { }

  ngOnInit(): void {
  }

}
