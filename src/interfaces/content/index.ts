import { ScheduleInterface } from 'interfaces/schedule';
import { UserInterface } from 'interfaces/user';
import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface ContentInterface {
  id?: string;
  title: string;
  body?: string;
  status?: string;
  publish_date?: any;
  user_id: string;
  business_id: string;
  created_at?: any;
  updated_at?: any;
  schedule?: ScheduleInterface[];
  user?: UserInterface;
  business?: BusinessInterface;
  _count?: {
    schedule?: number;
  };
}

export interface ContentGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  body?: string;
  status?: string;
  user_id?: string;
  business_id?: string;
}
