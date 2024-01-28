import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { ContentEditorComponent } from './content-editor/content-editor.component';
import { FormsModule } from '@angular/forms';
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
    NzRadioModule
  ]
})
export class ContentEditorModule { }
