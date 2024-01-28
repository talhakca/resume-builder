import { NgModule } from '@angular/core';
import { ComponentLibraryComponent } from './component-library.component';
import { HeadingComponent } from './heading/heading.component';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { DividerComponent } from './divider/divider.component';
import { TextComponent } from './text/text.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    ComponentLibraryComponent,
    HeadingComponent,
    DividerComponent,
    TextComponent
  ],
  imports: [
    CommonModule,
    NzDividerModule,
    QuillModule
  ],
  exports: [
    ComponentLibraryComponent
  ]
})
export class ComponentLibraryModule { }
