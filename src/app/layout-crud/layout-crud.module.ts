import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectLayoutComponent } from './select-layout/select-layout.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RouterModule, Routes } from '@angular/router';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';

const routes: Routes = [
  {
    path: '',
    component: SelectLayoutComponent
  },
  {
    path: 'create-layout',
    component: CreateTemplateComponent
  }
];

@NgModule({
  declarations: [
    SelectLayoutComponent,
    CreateTemplateComponent
  ],
  imports: [
    CommonModule,
    NzTableModule,
    RouterModule.forChild(routes),
    NzFormModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzInputModule
  ]
})
export class LayoutCrudModule { }
