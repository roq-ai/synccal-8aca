import { GetQueryInterface } from 'interfaces';

export interface PostTemplateInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface PostTemplateGetQueryInterface extends GetQueryInterface {
  id?: string;
}
