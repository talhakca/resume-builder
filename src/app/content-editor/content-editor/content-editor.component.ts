import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, OnInit, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { ContentTree, ContentTreeMapping } from '../utils/content-tree.interface';
import { ContentTreeItemType } from '../utils/content-tree-item-type.enum';
import { ComponentFactory } from '../utils/component-factory';
import { KeyValue } from '@angular/common';
import { inputDefinitions } from '../utils/input-definitions';

@Component({
  selector: 'app-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.scss']
})
export class ContentEditorComponent implements OnInit, AfterViewInit {

  @ViewChildren('componentContainer', { read: ViewContainerRef }) layouts!: QueryList<ViewContainerRef>;

  ContentTreeItemType = ContentTreeItemType;
  addedComponents: { id: string, componentRef: ComponentRef<any> }[] = [];
  initialContentTree = {
    id: '0',
    type: ContentTreeItemType.Container,
  };
  contentTree: ContentTree[] = [
    this.initialContentTree,
    {
      id: '0-1',
      type: ContentTreeItemType.Container
    },
    {
      id: '0-1-1',
      type: ContentTreeItemType.Container
    },
    {
      id: '0-2',
      type: ContentTreeItemType.Container
    }
  ];

  activeContentTreeItem: ContentTree | undefined;

  addComponentModalVisible = false;
  addComponentParentContainerId: string | undefined;
  componentSelectOptions!: { label: string, value: string, checked: boolean }[];
  showRequiredError = false;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.componentSelectOptions = Object.entries(ContentTreeItemType).filter(([key, value]) => value !== ContentTreeItemType.Container).map(([key, value]) => ({ label: key, value, checked: false }));
    console.log(this.componentSelectOptions);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.renderComponents(this.contentTree), 300)
  }

  renderComponents(contentTree: ContentTree[]) {
    contentTree.forEach(contentTreeItem => {
      if (contentTreeItem.type !== ContentTreeItemType.Container) {
        this.renderComponent(contentTreeItem);
      } else if (this.hasChildren(contentTreeItem.id)) {
        this.renderComponents(this.findChildrenTree(contentTreeItem.id));
      }
    });
  }

  renderComponent(content: ContentTree) {
    const elementContainer = this.layouts?.toArray()?.find(layout => layout.element.nativeElement.id === content.id);
    if (elementContainer && content.type !== ContentTreeItemType.Container) {
      const componentToAdd = ComponentFactory[content.type];
      if (componentToAdd) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentToAdd);
        if (componentFactory) {
          const addedComponent = elementContainer.createComponent(componentFactory);
          this.addedComponents.push({ id: content.id, componentRef: addedComponent })
          const inputDefinition = inputDefinitions.find(inputDefinition => inputDefinition.component === content.type);
          inputDefinition?.inputs.forEach(input => {
            addedComponent.instance[input.fieldName] = input.default;
          })
        }
      }
    }
  }

  findChildrenTree(id: string): ContentTree[] {
    const nodePath = id.split('-');
    const children = this.contentTree.filter(item => item.id.startsWith(`${id}-`) && item.id.split('-')?.length === nodePath?.length + 1);
    return children;
  }

  hasChildren(id: string) {
    const nodePath = id?.split('-');
    const hasChildren = this.contentTree.some(item => item.id.startsWith(`${id}-`) && item.id.split('-')?.length === nodePath?.length + 1);
    return hasChildren;
  }

  onAddContainerClick(id: string) {
    const defaultContainer = {
      id: this.findIDToNewChild(id),
      type: ContentTreeItemType.Container
    }
    this.contentTree.push(defaultContainer);
  }

  findIDToNewChild(id: string) {
    const childrenNodes = this.findChildrenTree(id);
    if (childrenNodes?.length) {
      const childrenNodeLatestId = this.findChildrenTree(id).map(item => {
        const splitted = item.id.split('-').pop();
        if (splitted?.length) {
          return parseInt(splitted);
        } else {
          return null;
        }
      }).filter(i => i) as number[];

      childrenNodeLatestId.sort((a: number, b: number) => a - b);
      const index = (childrenNodeLatestId.pop() as number) + 1;
      return `${id}-${index}`
    } else {
      return `${id}-0`;
    }

  }

  onAddComponentToContainerClick(contentId: string) {
    this.addComponentParentContainerId = contentId;
    this.addComponentModalVisible = true;
  }

  onAddComponentToContainer() {
    const selectedComponents = this.componentSelectOptions.filter(item => item.checked);
    if (selectedComponents?.length) {

      this.showRequiredError = false;
      selectedComponents.forEach(component => {
        const contentTreeItem = {
          id: this.findIDToNewChild(this.addComponentParentContainerId as string),
          type: component.value as ContentTreeItemType
        };
        this.contentTree.push(contentTreeItem);
        setTimeout(() => {
          this.renderComponent(contentTreeItem);
          component.checked = false;
          this.addComponentModalVisible = false;
        }, 300);
      });
    } else {
      this.showRequiredError = true;
    }
  }

  cancelAddComponent() {
    this.addComponentParentContainerId = undefined;
    this.addComponentModalVisible = false;
  }

  trackBy(index: number, contentTreeItem: ContentTree): string {
    return contentTreeItem.id;
  }

}
