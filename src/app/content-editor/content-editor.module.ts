import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { ContentEditorComponent } from './content-editor/content-editor.component';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ComponentLibraryModule } from 'projects/component-library/src/lib/component-library.module';

const routes: Routes = [
  {
    path: '',
    component: ContentEditorComponent

  }
];

@NgModule({
  declarations: [
    ContentEditorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatStepperModule,
    NzLayoutModule,
    NzCheckboxModule,
    NzModalModule,
    ComponentLibraryModule
  ]
})
export class ContentEditorModule { }
