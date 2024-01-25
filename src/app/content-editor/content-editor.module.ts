import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { TemplateEditorComponent } from './template-editor/template-editor.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { ContentEditorComponent } from './content-editor/content-editor.component';
const routes: Routes = [
  {
    path: '',
    component: ContentEditorComponent

  }
];

@NgModule({
  declarations: [
    TemplateEditorComponent,
    ContentEditorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatStepperModule,
    NzLayoutModule
  ]
})
export class ContentEditorModule { }
