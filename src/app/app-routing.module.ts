import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'content-editor/:id',
    loadChildren: () => import('./content-editor/content-editor.module').then(module => module.ContentEditorModule)
  },
  {
    path: '',
    loadChildren: () => import('./layout-crud/layout-crud.module').then(module => module.LayoutCrudModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
