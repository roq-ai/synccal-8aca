const mapping: Record<string, string> = {
  businesses: 'business',
  contents: 'content',
  'content-categories': 'content_category',
  'notification-settings': 'notification_settings',
  'platform-integrations': 'platform_integration',
  'post-templates': 'post_template',
  reminders: 'reminder',
  schedules: 'schedule',
  'social-medias': 'social_media',
  users: 'user',
  'user-preferences': 'user_preferences',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
