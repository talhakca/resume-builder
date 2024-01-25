import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { ContentTree, ContentTreeMapping } from '../utils/content-tree.interface';
import { ContentTreeItemType } from '../utils/content-tree-item-type.enum';
import { ComponentFactory } from '../utils/component-factory';

@Component({
  selector: 'app-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.scss']
})
export class ContentEditorComponent implements OnInit, AfterViewInit {

  @ViewChildren('componentContainer', { read: ViewContainerRef }) layouts!: QueryList<ViewContainerRef>;

  ContentTreeItemType = ContentTreeItemType;
  initialContentTree = {
    id: '0',
    type: ContentTreeItemType.Container,
  };
  defaultContainer = {

  }
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


  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.renderComponents(this.contentTree), 300)
  }

  renderComponents(contentTree: ContentTree[]) {
    contentTree.forEach(contentTreeItem => {
      if (contentTreeItem.type !== ContentTreeItemType.Container) {
        this.renderComponent(contentTreeItem);
      } else if (contentTreeItem.children) {
        this.renderComponents(contentTreeItem.children);
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
        }
      }
    }
  }

  findChildrenTree(id: string): ContentTree[] {
    const nodePath = id.split('-');
    const children = this.contentTree.filter(item => item.id.startsWith(`${id}-`) && item.id.split('-')?.length === nodePath?.length + 1);
    console.log(children)
    return children;
  }

  hasChildren(id: string) {
    const nodePath = id?.split('-');
    const hasChildren = this.contentTree.some(item => item.id.startsWith(`${id}-`) && item.id.split('-')?.length === nodePath?.length + 1);
    console.log(id, hasChildren)
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

}
