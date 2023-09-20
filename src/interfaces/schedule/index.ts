import { ReminderInterface } from 'interfaces/reminder';
import { ContentInterface } from 'interfaces/content';
import { SocialMediaInterface } from 'interfaces/social-media';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ScheduleInterface {
  id?: string;
  content_id: string;
  social_media_id: string;
  schedule_date: any;
  status?: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  reminder?: ReminderInterface[];
  content?: ContentInterface;
  social_media?: SocialMediaInterface;
  user?: UserInterface;
  _count?: {
    reminder?: number;
  };
}

export interface ScheduleGetQueryInterface extends GetQueryInterface {
  id?: string;
  content_id?: string;
  social_media_id?: string;
  status?: string;
  user_id?: string;
}
