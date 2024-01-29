import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { predefinedTemplates } from '../select-layout/utils/predefined-templates';
import { LocalStorageService } from 'src/app/services/local-storage-service/local-storage.service';
import { ContentTreeDefinition } from '../select-layout/utils/content-tree-definition.interface';
import { Router } from '@angular/router';
import { v4 } from 'uuid';
@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss']
})
export class CreateTemplateComponent {
  createTemplateForm = this.formBuilder.group({
    label: ['', [Validators.required]],
    description: ['', [Validators.required]],
    templateId: ['', [Validators.required]]
  });

  predefinedTemplates = predefinedTemplates;

  constructor(
    private formBuilder: FormBuilder,
    private lsService: LocalStorageService,
    private router: Router
  ) { }

  createTemplate() {
    if (this.createTemplateForm.valid) {
      const { templateId, ...addedLayout } = this.createTemplateForm.value;
      const contentTree = this.predefinedTemplates.find(template => template.id === templateId).contentTree;
      const addedContentTreeDefinition: ContentTreeDefinition = {
        ...addedLayout,
        id: v4(),
        contentTree: contentTree
      };
      this.lsService.addContentTree(addedContentTreeDefinition);
      this.router.navigateByUrl(`content-editor/${addedContentTreeDefinition.id}`);

    } else {
      Object.values(this.createTemplateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
