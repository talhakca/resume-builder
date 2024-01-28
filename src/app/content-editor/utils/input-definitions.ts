import { HeadingType } from "projects/component-library/src/lib/shared/enums/heading-type.enum";
import { ContentTreeItemType } from "./content-tree-item-type.enum";
import { DividerOrientation } from "projects/component-library/src/lib/shared/enums/divider-orientation.enum";
import { IconTheme } from "projects/component-library/src/lib/shared/enums/icon-theme.enum";

export const inputDefinitions = [
  {
    component: ContentTreeItemType.Heading,
    inputs: [
      {
        type: 'string',
        fieldName: 'content',
        default: 'Your Title Here'
      },
      {
        type: 'enum',
        fieldName: 'type',
        enum: HeadingType,
        default: HeadingType.H1
      }
    ]
  },
  {
    component: ContentTreeItemType.Divider,
    inputs: [
      {
        type: 'enum',
        fieldName: 'orientation',
        enum: DividerOrientation,
        default: DividerOrientation.Center
      },
      {
        type: 'string',
        fieldName: 'text',
        default: ''
      }
    ]
  },
  {
    component: ContentTreeItemType.Text,
    inputs: [
      {
        type: 'string',
        fieldName: 'text',
        default: 'Enter your text here'
      }
    ]
  },
  {
    component: ContentTreeItemType.Icon,
    inputs: [
      {
        type: 'string',
        fieldName: 'name',
        default: 'phone'
      },
      {
        type: 'enum',
        enum: IconTheme,
        fieldName: 'theme',
        default: IconTheme.Outlined
      }
    ]
  }
];