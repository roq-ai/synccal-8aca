import { GetQueryInterface } from 'interfaces';

export interface PlatformIntegrationInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface PlatformIntegrationGetQueryInterface extends GetQueryInterface {
  id?: string;
}
