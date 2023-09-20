interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: ['Guest'],
  tenantRoles: ['Owner', 'Team Member', 'Content Creator', 'Social Media Manager', 'End Customer'],
  tenantName: 'Business',
  applicationName: 'SyncCal',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Read content',
    'Read user information',
    'Read business information',
    'Read social media profiles',
  ],
  ownerAbilities: [
    'Manage user preferences',
    'Manage platform integration',
    'Manage notification settings',
    'Manage content category',
    'Manage post template',
    'Manage users',
    'Manage businesses',
    'Manage content',
    'Manage social media',
    'Manage schedule',
    'Manage reminders',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/7c3a06f4-7d70-4457-a7c1-8ff1827514ea',
};
