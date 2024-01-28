import { NgModule } from '@angular/core';
import { ComponentLibraryComponent } from './component-library.component';
import { HeadingComponent } from './heading/heading.component';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DividerComponent } from './divider/divider.component';
import { TextComponent } from './text/text.component';
import { QuillModule } from 'ngx-quill';
import { IconComponent } from './icon/icon.component';

@NgModule({
  declarations: [
    ComponentLibraryComponent,
    HeadingComponent,
    DividerComponent,
    TextComponent,
    IconComponent
  ],
  imports: [
    CommonModule,
    NzDividerModule,
    QuillModule,
    NzIconModule
  ],
  exports: [
    ComponentLibraryComponent
  ]
})
export class ComponentLibraryModule { }
