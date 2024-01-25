import { HeadingType } from "projects/component-library/src/lib/shared/interfaces/heading-type.enum";
import { ContentTreeItemType } from "./content-tree-item-type.enum";

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
  }
];