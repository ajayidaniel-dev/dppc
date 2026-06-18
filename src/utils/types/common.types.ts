export interface ApiResponse<T = unknown> {
  status?: string | number;
  message?: string;
  data: T;
}

export interface PaginatedResponse<T = unknown> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AuthUser {
  token: string;
  profile?: UserProfile;
  permissions?: string[];
}

export interface UserProfile {
  id: string | number;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
  [key: string]: unknown;
}

export interface JwtPayload {
  sub?: string;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

export type Status = "green" | "amber" | "red";

export interface SelectOption {
  label: string;
  value: string | number;
}
