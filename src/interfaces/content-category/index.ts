import { GetQueryInterface } from 'interfaces';

export interface ContentCategoryInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface ContentCategoryGetQueryInterface extends GetQueryInterface {
  id?: string;
}
