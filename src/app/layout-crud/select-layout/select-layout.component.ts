import { Component, OnInit } from '@angular/core';
import { predefinedTemplates } from './utils/predefined-templates';
import { ContentTree } from 'src/app/content-editor/utils/content-tree.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-layout',
  templateUrl: './select-layout.component.html',
  styleUrls: ['./select-layout.component.scss']
})
export class SelectLayoutComponent implements OnInit {

  predefinedTemplates = predefinedTemplates;
  contentTrees: {
    label: string,
    description: string,
    contentTree: ContentTree[]
  }[] = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getContentTrees();
  }

  getContentTrees() {
    const contentTrees = localStorage.getItem('contentTrees');
    if (contentTrees?.length) {
      this.contentTrees = JSON.parse(contentTrees);
    }
  }

  goToContentEditor(id: string) {
    this.router.navigateByUrl(`content-editor/${id}`);
  }

}
