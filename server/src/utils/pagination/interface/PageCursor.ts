import { PageCursorInfo } from './PageCursorInfo';

export interface PageCursor {
  // root type
  totalCount: number;
  edges: Edge;
  pageCursorInfo: PageCursorInfo;
}

export interface Edge {
  // root type
  node: any[];
  cursor: string;
}
