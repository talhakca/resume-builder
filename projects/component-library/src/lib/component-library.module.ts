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
import { HeaderComponent } from './header/header.component';
import { SummaryComponent } from './summary/summary.component';
import { ExperienceComponent } from './experience/experience.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { EducationComponent } from './education/education.component';

@NgModule({
  declarations: [
    ComponentLibraryComponent,
    HeadingComponent,
    DividerComponent,
    TextComponent,
    IconComponent,
    HeaderComponent,
    SummaryComponent,
    ExperienceComponent,
    ExperiencesComponent,
    EducationComponent
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
