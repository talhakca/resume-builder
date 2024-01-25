import { ContentTreeItemType } from "./content-tree-item-type.enum";

export interface ContentTree {
  id: string;
  type: ContentTreeItemType;
  children?: ContentTree[];
}

export interface ContentTreeMapping {
  id: string;
  children?: ContentTreeMapping[];
}

