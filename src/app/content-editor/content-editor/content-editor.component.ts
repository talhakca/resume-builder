import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, OnInit, QueryList, Renderer2, ViewChildren, ViewContainerRef } from '@angular/core';
import { ContentTree } from '../utils/content-tree.interface';
import { ContentTreeItemType } from '../utils/content-tree-item-type.enum';
import { ComponentFactory } from '../utils/component-factory';
import { inputDefinitions } from '../utils/input-definitions';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.scss']
})
export class ContentEditorComponent implements OnInit, AfterViewInit {

  @ViewChildren('componentContainer', { read: ViewContainerRef }) layouts!: QueryList<ViewContainerRef>;

  hoveredId!: string | undefined;

  ContentTreeItemType = ContentTreeItemType;
  addedComponents: { id: string, componentRef: ComponentRef<any> }[] = [];
  defaultCssStyle = {
    width: 'auto',
    'align-items': 'unset',
    'justify-content': 'unset'
  };
  initialContentTree = {
    id: '0',
    type: ContentTreeItemType.Container,
    cssStyle: { ...this.defaultCssStyle }
  };
  contentTree: ContentTree[] = [
    this.initialContentTree
  ];

  dragMode = false;
  dragOverContainerId: string;
  activeContentTreeItem: ContentTree | undefined;

  addComponentModalVisible = false;
  addComponentOrContainerModalVisibility = false;
  addComponentParentContainerId: string | undefined;
  addContainerId: string | undefined;
  componentSelectOptions!: { label: string, value: string, checked: boolean }[];
  showRequiredError = false;
  draggingContent: ContentTree;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetector: ChangeDetectorRef
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
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentToAdd as any);
        if (componentFactory) {
          const addedComponent = elementContainer.createComponent(componentFactory);
          this.addedComponents.push({ id: content.id, componentRef: addedComponent })
          elementContainer.insert(addedComponent.hostView);
          const inputDefinition = inputDefinitions.find(inputDefinition => inputDefinition.component === content.type);
          Object.entries(content?.inputs).forEach(([key, value]) => {
            addedComponent.instance[key] = value;
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
      type: ContentTreeItemType.Container,
      cssStyle: { ...this.defaultCssStyle }
    };
    this.contentTree.push(defaultContainer);
    this.addComponentOrContainerModalVisibility = false;
  }

  findIDToNewChild(id: string) {
    const childrenNodes = this.findChildrenTree(id);
    if (childrenNodes?.length) {
      const childrenNodeLatestId = this.findChildrenTree(id).map(item => {
        const splitted = item.id.split('-').pop();
        console.log(typeof splitted)
        console.log(splitted);
        if (typeof splitted === 'string') {
          return parseInt(splitted);
        } else {
          return null;
        }
      }).filter(i => i !== null) as number[];

      childrenNodeLatestId.sort((a: number, b: number) => a - b);
      console.log(childrenNodeLatestId)
      const index = (childrenNodeLatestId.pop() as number) + 1;
      return `${id}-${index}`
    } else {
      return `${id}-0`;
    }

  }

  onAddComponentToContainerClick(contentId: string) {
    this.addComponentParentContainerId = contentId;
    this.addComponentOrContainerModalVisibility = false;
    this.addComponentModalVisible = true;
  }

  onAddComponentToContainer() {
    const selectedComponents = this.componentSelectOptions.filter(item => item.checked);
    if (selectedComponents?.length) {
      this.showRequiredError = false;
      selectedComponents.forEach(component => {
        const inputs = (inputDefinitions.find(def => def.component === component.value).inputs as any).reduce((acc, cur) => {
          acc[cur.fieldName] = cur.default;
          return acc;
        }, {});
        const contentTreeItem = {
          id: this.findIDToNewChild(this.addComponentParentContainerId as string),
          type: component.value as ContentTreeItemType,
          inputs
        };
        this.contentTree.push(contentTreeItem);
        setTimeout(() => {
          this.renderComponent(contentTreeItem);
          component.checked = false;
        }, 100);
        this.addComponentModalVisible = false;
        this.activeContentTreeItem = this.contentTree[this.contentTree.length - 1];
      });
    } else {
      this.showRequiredError = true;
    }
  }

  setActiveComponent(event: MouseEvent, id: string) {
    event.stopPropagation();
    this.setActiveContentTreeItem(id);
  }

  cancelAddComponent() {
    this.addComponentParentContainerId = undefined;
    this.addComponentModalVisible = false;
  }

  trackBy(index: number, contentTreeItem: ContentTree): string {
    return contentTreeItem.id;
  }

  onHover(id?: string) {
    this.hoveredId = id;
  }

  updateInputs() {
    if (this.activeContentTreeItem.type !== ContentTreeItemType.Container) {
      const updatedComponent = this.addedComponents.find(component => component.id === this.activeContentTreeItem.id);
      Object.entries(this.activeContentTreeItem.inputs).forEach(([key, value]) => {
        updatedComponent.componentRef.instance[key] = value;
      });
    } else {
      const element = document.getElementById(this.activeContentTreeItem.id);
      Object.entries(this.activeContentTreeItem.cssStyle).forEach(([key, value]) => {
        element.style[key] = value;
      })
    }
  }

  onContainerClick(event: MouseEvent, id: string) {
    event.stopPropagation();
    this.setActiveContentTreeItem(id);
  }

  setActiveContentTreeItem(id: string) {
    this.activeContentTreeItem = this.contentTree.find(item => item.id === id);

  }

  openSelectModal(id: string) {
    this.addContainerId = id;
    this.addComponentOrContainerModalVisibility = true;
  }
}
