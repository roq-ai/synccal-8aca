import { ScheduleInterface } from 'interfaces/schedule';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SocialMediaInterface {
  id?: string;
  platform: string;
  profile_url?: string;
  followers_count?: number;
  following_count?: number;
  post_count?: number;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  schedule?: ScheduleInterface[];
  user?: UserInterface;
  _count?: {
    schedule?: number;
  };
}

export interface SocialMediaGetQueryInterface extends GetQueryInterface {
  id?: string;
  platform?: string;
  profile_url?: string;
  user_id?: string;
}
