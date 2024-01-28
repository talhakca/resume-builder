import { ContentTree } from "src/app/content-editor/utils/content-tree.interface";

export interface ContentTreeDefinition {
  label: string;
  id: string;
  description: string;
  contentTree: ContentTree[];
}
