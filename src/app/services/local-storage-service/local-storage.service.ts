import { Injectable } from '@angular/core';
import { ContentTreeDefinition } from 'src/app/layout-crud/select-layout/utils/content-tree-definition.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getContentTrees() {
    const contentTrees = localStorage.getItem('contentTrees');
    if (contentTrees?.length) {
      return JSON.parse(contentTrees);
    } else {
      return [];
    }
  }

  addContentTree(contentTree: ContentTreeDefinition) {
    const contentTrees = this.getContentTrees();
    contentTrees.push(contentTree);
    localStorage.setItem('contentTrees', JSON.stringify(contentTrees));
  }
}
