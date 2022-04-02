interface Config {
  debug: boolean;
  debugPort: number;
  dbUrl: string;
  links: {
    support: string;
    invite: string;
    login: string;
  };
  auth: {
    botToken: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  };
  oauthEndpoints: {
    tokenExchange: string;
    getCurrentUser: string;
    getCurrentUserGuilds: string;
  };
  keys: {
    cookieSign: string;
  };
  cacheTimeouts: {
    users: number;
    userGuilds: number;
  };
  availableLanguages: Language[];
  requestLimitPerMinute: number;
  hostname: string;
}

interface Language {
  id: string;
  label: string;
}

interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

interface User {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string;
  accent_color?: number;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
}

interface Guild {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: number | string[];
  permissions_new?: string | string[];
  features?: string[];
}

interface Command {
  name: string;
  aliases: string[];
  description: string;
  category: string;
  usage: string;
  cooldown: number;
  required_perms: string[];
  required_bot_perms: string[];
}

enum LogType {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  WARNING = "WARNING",
  DEFAULT = "LOG",
}

export { Config, AccessTokenResponse, User, Guild, Command, LogType };
