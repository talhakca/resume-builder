import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { ContentTree } from '../utils/content-tree.interface';
import { inputDefinitions } from '../utils/input-definitions';
import { ContentTreeItemType } from '../utils/content-tree-item-type.enum';
import { StringInputType } from '../utils/string-input-type.enum';

@Component({
  selector: 'app-content-tree-item-settings',
  templateUrl: './content-tree-item-settings.component.html',
  styleUrls: ['./content-tree-item-settings.component.scss']
})
export class ContentTreeItemSettingsComponent implements OnInit, OnChanges {

  @Input() contentTreeItem: ContentTree;

  @Output() contentSaved = new EventEmitter();
  undoOption = {
    icon: 'undo',
    value: 'unset'
  };
  inputDefinitions = inputDefinitions;
  activeInputDefinition;
  ContentTreeItemType = ContentTreeItemType;
  cssOptions = [
    {
      key: 'Vertical Alignment',
      fieldName: 'align-items',
      value: [
        {
          icon: 'vertical-align-top',
          value: 'flex-start'
        },
        {
          icon: 'vertical-align-middle',
          value: 'center'
        },
        {
          icon: 'vertical-align-bottom',
          value: 'flex-end'
        },
        {
          icon: 'column-height',
          value: 'space-between'
        },
        this.undoOption,
      ],

    },
    {
      key: 'Horizontal Alignment',
      fieldName: 'justify-content',
      value: [
        {
          icon: 'align-left',
          value: 'flex-start'
        },
        {
          icon: 'align-center',
          value: 'center'
        },
        {
          icon: 'align-right',
          value: 'flex-end'
        },
        {
          icon: 'column-width',
          value: 'space-between'
        },
        this.undoOption
      ]
    },
    {
      key: 'Direction',
      fieldName: 'flex-direction',
      value: [
        {
          icon: 'right',
          value: 'row'
        },
        {
          icon: 'down',
          value: 'column'
        },
        this.undoOption
      ]
    },
    {
      key: 'Wrap',
      fieldName: 'flex-wrap',
      value: [
        {
          icon: 'check-circle',
          value: 'wrap'
        },
        {
          icon: 'stop',
          value: 'nowrap'
        },
        this.undoOption
      ]
    }
  ];

  width: number;
  height: number;
  padding: number;
  stringInputType = StringInputType.Textbox;
  StringInputType = StringInputType;

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
      this.setWidth();
      this.setHeight();
      this.setPadding();
    }
  }

  setWidth() {
    const width = this.getNumberFromString(this.contentTreeItem.cssStyle.width);
    this.width = width ?? 100;
  }

  setHeight() {
    const height = this.getNumberFromString(this.contentTreeItem.cssStyle.height);
    this.height = height ?? 100;
  }

  setPadding() {
    const padding = this.getNumberFromString(this.contentTreeItem.cssStyle.padding);
    console.log(padding);
    this.padding = padding ?? 0;
  }

  getNumberFromString(string: string) {
    const match = string?.match(/(\d+)%/);
    return match ? Number(match[1]) : undefined;
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

  onHeightChange() {
    this.updateCSSStyle('height', `${this.height}%`);
    this.emitContentTreeItem();
  }

  onPaddingChange() {
    this.updateCSSStyle('padding', `${this.padding}px`);
    this.emitContentTreeItem();
  }

  emitContentTreeItem() {
    this.contentSaved.emit();
  }

  changeStringInputType() {
    if (this.stringInputType === StringInputType.RichTextEditor) {
      this.stringInputType = StringInputType.Textbox;
    } else {
      this.stringInputType = StringInputType.RichTextEditor;
    }
  }

}
