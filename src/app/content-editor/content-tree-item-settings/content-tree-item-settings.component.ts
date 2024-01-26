import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { ContentTree } from '../utils/content-tree.interface';
import { inputDefinitions } from '../utils/input-definitions';
import { ContentTreeItemType } from '../utils/content-tree-item-type.enum';

@Component({
  selector: 'app-content-tree-item-settings',
  templateUrl: './content-tree-item-settings.component.html',
  styleUrls: ['./content-tree-item-settings.component.scss']
})
export class ContentTreeItemSettingsComponent implements OnInit, OnChanges {

  @Input() contentTreeItem: ContentTree;

  @Output() contentSaved = new EventEmitter();

  inputDefinitions = inputDefinitions;
  activeInputDefinition;
  ContentTreeItemType = ContentTreeItemType;
  flexAlignments = [
    {
      key: 'Vertical Alignment',
      value: [
        {
          icon: 'vertical-align-top',
          key: 'align-items',
          value: 'flex-start'
        },
        {
          icon: 'vertical-align-middle',
          key: 'align-items',
          value: 'center'
        },
        {
          icon: 'vertical-align-bottom',
          key: 'align-items',
          value: 'flex-end'
        },
        {
          icon: 'column-height',
          key: 'align-items',
          value: 'space-between'
        }
      ]
    },
    {
      key: 'Horizontal Alignment',
      value: [
        {
          icon: 'align-left',
          key: 'justify-content',
          value: 'flex-start'
        },
        {
          icon: 'align-center',
          key: 'justify-content',
          value: 'center'
        },
        {
          icon: 'align-right',
          key: 'justify-content',
          value: 'flex-end'
        },
        {
          icon: 'column-width',
          key: 'justify-content',
          value: 'space-between'
        },
      ]
    }
  ];

  width: number;

  constructor() { }

  ngOnInit(): void {
    if (this.contentTreeItem) {
      this.checkChanges();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.contentTreeItem) {
      this.checkChanges();
    }
  }

  checkChanges() {
    this.setActiveInputDefinition();
    if (this.contentTreeItem.type === this.ContentTreeItemType.Container) {
      this.setWidth()
    }
  }

  setWidth() {
    const match = this.contentTreeItem.cssStyle.width.match(/(\d+)%/);

    // Extract the numeric value and convert it to a number
    this.width = match ? Number(match[1]) : 100;
  }

  setActiveInputDefinition() {
    this.activeInputDefinition = this.inputDefinitions.find(inputDefinition => inputDefinition.component === this.contentTreeItem.type);
  }

  getOptionsFromEnum(enumValue: any) {
    return Object.entries(enumValue).map(([key, value]) => ({ key, value }));
  }

  onSaveContent() {
    this.contentSaved.emit();
  }

  onFlexChange(alignment: { key: string, value: string, icon: string }) {
    this.updateCSSStyle(alignment.key, alignment.value);
    this.emitContentTreeItem();
  }

  updateCSSStyle(key: string, value: string) {
    this.contentTreeItem.cssStyle = {
      ...(this.contentTreeItem.cssStyle ?? {}),
      [key]: value
    };
  }

  onWidthChange() {
    this.updateCSSStyle('width', `${this.width}%`);
    this.emitContentTreeItem();
  }

  emitContentTreeItem() {
    this.contentSaved.emit();
  }

}
