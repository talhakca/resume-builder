import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectLayoutComponent } from './select-layout/select-layout.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RouterModule, Routes } from '@angular/router';
import { CreateTemplateComponent } from './create-template/create-template.component';

const routes: Routes = [
  {
    path: '',
    component: SelectLayoutComponent
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
    RouterModule.forChild(routes)
  ]
})
export class LayoutCrudModule { }
