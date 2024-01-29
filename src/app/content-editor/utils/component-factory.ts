import { HeadingComponent } from "projects/component-library/src/lib/heading/heading.component";
import { ContentTreeItemType } from "./content-tree-item-type.enum";
import { DividerComponent } from "projects/component-library/src/lib/divider/divider.component";
import { TextComponent } from "projects/component-library/src/lib/text/text.component";
import { IconComponent } from "projects/component-library/src/lib/icon/icon.component";
import { HeaderComponent } from "projects/component-library/src/lib/header/header.component";
import { SummaryComponent } from "projects/component-library/src/lib/summary/summary.component";
import { ExperiencesComponent } from "projects/component-library/src/lib/experiences/experiences.component";
import { EducationComponent } from "projects/component-library/src/lib/education/education.component";

export const ComponentFactory = {
  [ContentTreeItemType.Heading]: HeadingComponent,
  [ContentTreeItemType.Divider]: DividerComponent,
  [ContentTreeItemType.Text]: TextComponent,
  [ContentTreeItemType.Icon]: IconComponent,
  [ContentTreeItemType.Header]: HeaderComponent,
  [ContentTreeItemType.Summary]: SummaryComponent,
  [ContentTreeItemType.Experiences]: ExperiencesComponent,
  [ContentTreeItemType.EducationSection]: EducationComponent,
};
