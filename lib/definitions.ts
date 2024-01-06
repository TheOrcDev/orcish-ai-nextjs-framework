export type DateTime = Date;

export type Account = {
  id: string;
  userId: string;
  providerType: string;
  providerId: string;
  providerAccountId: string;
  refreshToken?: string | null;
  accessToken?: string | null;
  accessTokenExpires?: DateTime | null;
  createdAt: DateTime;
  updatedAt: DateTime;
  user: User;
};

export type Session = {
  id: string;
  userId: string;
  expires: DateTime;
  sessionToken: string;
  accessToken: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  user: User;
};

export type User = {
  id: string;
  name: string;
  password: string;
  email: string;
  emailVerified?: DateTime | null;
  image?: string | null;
  credits: number;
  accounts: Account[];
  sessions: Session[];
};

export type VerificationRequest = {
  id: string;
  identifier: string;
  token: string;
  expires: DateTime;
  createdAt: DateTime;
  updatedAt: DateTime;
};
