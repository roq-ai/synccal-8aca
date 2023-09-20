import axios from 'axios';
import queryString from 'query-string';
import { NotificationSettingsInterface, NotificationSettingsGetQueryInterface } from 'interfaces/notification-settings';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getNotificationSettings = async (
  query?: NotificationSettingsGetQueryInterface,
): Promise<PaginatedInterface<NotificationSettingsInterface>> => {
  const response = await axios.get('/api/notification-settings', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createNotificationSettings = async (notificationSettings: NotificationSettingsInterface) => {
  const response = await axios.post('/api/notification-settings', notificationSettings);
  return response.data;
};

export const updateNotificationSettingsById = async (
  id: string,
  notificationSettings: NotificationSettingsInterface,
) => {
  const response = await axios.put(`/api/notification-settings/${id}`, notificationSettings);
  return response.data;
};

export const getNotificationSettingsById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/notification-settings/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteNotificationSettingsById = async (id: string) => {
  const response = await axios.delete(`/api/notification-settings/${id}`);
  return response.data;
};
