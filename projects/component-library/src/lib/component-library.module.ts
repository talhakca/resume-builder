import { NgModule } from '@angular/core';
import { ComponentLibraryComponent } from './component-library.component';
import { HeadingComponent } from './heading/heading.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ComponentLibraryComponent,
    HeadingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ComponentLibraryComponent
  ]
})
export class ComponentLibraryModule { }
