import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, HostListener, OnDestroy, OnInit, QueryList, Renderer2, ViewChildren, ViewContainerRef } from '@angular/core';
import { ContentTree } from '../utils/content-tree.interface';
import { ContentTreeItemType } from '../utils/content-tree-item-type.enum';
import { ComponentFactory } from '../utils/component-factory';
import { inputDefinitions } from '../utils/input-definitions';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage-service/local-storage.service';
import { ContentTreeDefinition } from 'src/app/layout-crud/select-layout/utils/content-tree-definition.interface';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.scss']
})
export class ContentEditorComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren('componentContainer', { read: ViewContainerRef }) layouts!: QueryList<ViewContainerRef>;
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Control') {
      if (this.editMode) {
        this.editModeStyles.forEach(key => {
          document.documentElement.style.setProperty(key, '0px');
        });
      } else {
        this.defaultStyles.forEach(item => {
          console.log(item)
          document.documentElement.style.setProperty(item.key, item.value);
        });
      }
      this.editMode = !this.editMode;
    }
  };

  defaultStyles: KeyValue<string, string>[] = [
    {
      key: '--container-border',
      value: '2px solid gray'
    },
    {
      key: '--filled-container-padding',
      value: '10px'
    }
    ,
    {
      key: '--component-container-border',
      value: '1px solid pink'
    }
  ];

  editModeStyles = [
    '--container-border',
    '--filled-container-padding',
    '--component-container-border'
  ];

  editMode = true;

  hoveredId!: string | undefined;

  ContentTreeItemType = ContentTreeItemType;
  addedComponents: { id: string, componentRef: ComponentRef<any> }[] = [];
  defaultCssStyle = {
    width: 'unset',
    'align-items': 'unset',
    'justify-content': 'unset',
    height: 'unset',
    'flex-wrap': 'wrap',
    'flex-direction': 'row'
  };
  mainContentTree!: ContentTree;
  contentTree!: ContentTree[];

  activeContentTreeItem: ContentTree | undefined;

  addComponentModalVisible = false;
  addComponentOrContainerModalVisibility = false;
  addComponentParentContainerId: string | undefined;
  addContainerId: string | undefined;
  componentSelectOptions!: { label: string, value: string, checked: boolean }[];
  showRequiredError = false;
  activeContentTree!: ContentTreeDefinition;
  contentTrees!: ContentTreeDefinition[];
  subscription: Subscription;
  contentTreeDefinitionId: string;


  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private activatedRoute: ActivatedRoute,
    private lsService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.componentSelectOptions = Object.entries(ContentTreeItemType).filter(([key, value]) => value !== ContentTreeItemType.Container).map(([key, value]) => ({ label: key, value, checked: false }));
    this.subscription = this.subscribeToId();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  subscribeToId() {
    return this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id !== this.contentTreeDefinitionId) {
        this.contentTreeDefinitionId = id;
        this.contentTrees = this.lsService.getContentTrees();
        if (this.contentTrees) {
          this.activeContentTree = this.contentTrees?.find(contentTreDef => contentTreDef.id === id);
          if (this.activeContentTree) {
            this.contentTree = this.activeContentTree.contentTree;
            if (this.contentTree) {
              this.mainContentTree = this.contentTree.find(item => item.id === '0');
              setTimeout(() => {
                this.renderComponents([this.mainContentTree]);
              }, 300)
            }
          }
        }
      }
    });
  }

  renderComponents(contentTree: ContentTree[]) {
    contentTree.forEach(contentTreeItem => {
      if (contentTreeItem.type !== ContentTreeItemType.Container) {
        this.renderComponent(contentTreeItem);
      } else {
        const childrenTree = this.findChildrenTree(contentTreeItem.id);
        this.renderStyles(contentTreeItem);
        if (childrenTree?.length) {
          this.renderComponents(childrenTree);
        }
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
          Object.entries(content?.inputs).forEach(([key, value]) => {
            addedComponent.instance[key] = value;
          })
        }
      }
    }
  }

  renderStyles(content: ContentTree, tryCount = 0) {
    const element = document.getElementById(content.id);
    if (element) {
      Object.entries(content.cssStyle).forEach(([key, value]) => {
        element.style[key] = value;
      });
    } else {
      if (tryCount < 5) {
        setTimeout(() => this.renderStyles(content, tryCount + 1), 300)
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
        if (typeof splitted === 'string') {
          return parseInt(splitted);
        } else {
          return null;
        }
      }).filter(i => i !== null) as number[];

      childrenNodeLatestId.sort((a: number, b: number) => a - b);
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
      this.renderStyles(this.activeContentTreeItem);
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

  deleteContainer(contentId: string) {
    this.contentTree = this.contentTree.filter(item => item.id !== contentId);
  }
}
