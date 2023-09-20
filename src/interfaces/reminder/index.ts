import { ScheduleInterface } from 'interfaces/schedule';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ReminderInterface {
  id?: string;
  schedule_id: string;
  reminder_date: any;
  message?: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  schedule?: ScheduleInterface;
  user?: UserInterface;
  _count?: {};
}

export interface ReminderGetQueryInterface extends GetQueryInterface {
  id?: string;
  schedule_id?: string;
  message?: string;
  user_id?: string;
}
