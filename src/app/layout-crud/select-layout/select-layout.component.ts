import { Component, OnInit } from '@angular/core';
import { predefinedTemplates } from './utils/predefined-templates';
import { ContentTree } from 'src/app/content-editor/utils/content-tree.interface';
import { Router } from '@angular/router';
import { ContentTreeDefinition } from './utils/content-tree-definition.interface';
import { LocalStorageService } from 'src/app/services/local-storage-service/local-storage.service';

@Component({
  selector: 'app-select-layout',
  templateUrl: './select-layout.component.html',
  styleUrls: ['./select-layout.component.scss']
})
export class SelectLayoutComponent implements OnInit {

  predefinedTemplates = predefinedTemplates;
  contentTrees: ContentTreeDefinition[] = [];

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.getContentTrees();
  }

  getContentTrees() {
    this.contentTrees = this.localStorageService.getContentTrees();
  }

  goToContentEditor(id: string) {
    this.router.navigateByUrl(`content-editor/${id}`);
  }

  addLayout() {
    this.router.navigateByUrl('create-layout');
  }

}
