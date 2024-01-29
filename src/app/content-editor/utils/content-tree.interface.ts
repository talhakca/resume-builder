import { ContentTreeItemType } from "./content-tree-item-type.enum";

export interface ContentTree {
  id: string;
  type: ContentTreeItemType;
  inputs?: Record<string, unknown>;
  cssStyle?: Record<string, string>;
}

export interface ContentTreeMapping {
  id: string;
  children?: ContentTreeMapping[];
}

