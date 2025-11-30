export enum UserType {
  ADMIN = 'ADMIN',
  SUPERADMIN = 'SUPERADMIN',
  GUEST = 'GUEST',
  OWNER = 'OWNER',
}

// Base User interface
export interface User {
  id: string;
  clerkId?: string;
  name?: string;
  email: string;
  role: UserType;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

// User creation input type
export interface CreateUserInput {
  clerkId?: string;
  name?: string;
  email: string;
  role?: UserType;
  image?: string;
}

// User update input type
export interface UpdateUserInput {
  name?: string;
  email?: string;
  role?: UserType;
  image?: string;
}

// User response type (for API responses)
export interface UserResponse {
  id: string;
  clerkId?: string;
  name?: string;
  email: string;
  role: UserType;
  image?: string;
  createdAt: string; // ISO string for JSON serialization
  updatedAt: string; // ISO string for JSON serialization
}

// API Error response type
export interface ApiErrorResponse {
  error: string;
  message?: string;
  statusCode?: number;
}

// Pagination response type
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
