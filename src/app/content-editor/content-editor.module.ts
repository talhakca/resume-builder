import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { ContentEditorComponent } from './content-editor/content-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ComponentLibraryModule } from 'projects/component-library/src/lib/component-library.module';
import { ContentTreeItemSettingsComponent } from './content-tree-item-settings/content-tree-item-settings.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { QuillModule } from 'ngx-quill'
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { ColorPickerModule } from 'ngx-color-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ExperiencesInputComponent } from './experiences-input/experiences-input.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { EducationInputComponent } from './education-input/education-input.component';

const routes: Routes = [
  {
    path: '',
    component: ContentEditorComponent

  }
];

@NgModule({
  declarations: [
    ContentEditorComponent,
    ContentTreeItemSettingsComponent,
    ExperiencesInputComponent,
    EducationInputComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatStepperModule,
    NzLayoutModule,
    NzCheckboxModule,
    NzModalModule,
    ComponentLibraryModule,
    NzPopconfirmModule,
    NzSelectModule,
    NzInputModule,
    NzButtonModule,
    DragDropModule,
    NzIconModule,
    NzSliderModule,
    QuillModule,
    NzRadioModule,
    ColorPickerModule,
    NzInputNumberModule,
    ReactiveFormsModule,
    NzFormModule,
    NzDatePickerModule,
    NzCollapseModule
  ]
})
export class ContentEditorModule { }
