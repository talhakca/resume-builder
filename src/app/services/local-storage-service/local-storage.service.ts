import { Injectable } from '@angular/core';
import { ContentTree } from 'src/app/content-editor/utils/content-tree.interface';
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
    this.setContentTrees(contentTrees);
  }

  saveContentTree(contentTreeDefinition: ContentTreeDefinition) {
    const contentTrees = this.getContentTrees();
    const updatedContentTrees = [
      ...contentTrees.filter(tree => tree.id !== contentTreeDefinition.id),
      contentTreeDefinition
    ];
    this.setContentTrees(updatedContentTrees);
  }

  setContentTrees(contentTrees: ContentTreeDefinition[]) {
    localStorage.setItem('contentTrees', JSON.stringify(contentTrees));
  }
}
