import { HeadingComponent } from "projects/component-library/src/lib/heading/heading.component";
import { ContentTreeItemType } from "./content-tree-item-type.enum";

export const ComponentFactory = {
  [ContentTreeItemType.Heading]: HeadingComponent
};
