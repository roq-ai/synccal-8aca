import { GetQueryInterface } from 'interfaces';

export interface NotificationSettingsInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface NotificationSettingsGetQueryInterface extends GetQueryInterface {
  id?: string;
}
