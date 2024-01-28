import { HeadingComponent } from "projects/component-library/src/lib/heading/heading.component";
import { ContentTreeItemType } from "./content-tree-item-type.enum";
import { DividerComponent } from "projects/component-library/src/lib/divider/divider.component";
import { TextComponent } from "projects/component-library/src/lib/text/text.component";

export const ComponentFactory = {
  [ContentTreeItemType.Heading]: HeadingComponent,
  [ContentTreeItemType.Divider]: DividerComponent,
  [ContentTreeItemType.Text]: TextComponent
};
