import { Component, Input, OnInit } from '@angular/core';
import { HeaderData } from '../shared/interfaces/header-data.interface';
import { HeaderType } from '../shared/enums/header-type.enum';

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title?: string;
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() backgroundImageUrl?: string;
  @Input() type: HeaderType;
  HeaderType = HeaderType;

  url: string;
  constructor() { }

  ngOnInit(): void {
    this.setUrlForBackgroundImage();
  }

  ngOnChanges(): void {
    this.setUrlForBackgroundImage();
  }

  setUrlForBackgroundImage() {
    this.url = `url(${this.backgroundImageUrl})`;
  }

}
