import React, {createContext, useState, useContext} from 'react';

interface AuthResult {
  accessToken: string;
  accessTokenExpirationDate: string;
}

interface AuthContextType {
  authResult: AuthResult | null;
  setAuthResult: (token: AuthResult) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [authResult, setAuthResult] = useState<AuthResult | null>(null);

  return (
    <AuthContext.Provider value={{authResult, setAuthResult}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
