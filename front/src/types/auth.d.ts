declare module '../api/auth' {
    export interface AuthResponse {
      token: string;
      user: {
        id: string;
        email: string;
      };
    }
  
    export const register: (username: string, email: string, password: string) => Promise<AuthResponse>;
    export const login: (email: string, password: string) => Promise<AuthResponse>;
    export const isAuthenticated: () => boolean;
  }
  