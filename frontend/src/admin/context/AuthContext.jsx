import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('nua_admin_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('nua_admin_token') || null);
  const [loading, setLoading] = useState(true);

  // Verify token on initial load
  useEffect(() => {
    const verifyUser = async () => {
      const savedToken = localStorage.getItem('nua_admin_token');
      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });
        const data = await res.json();
        if (data.success && data.user) {
          setUser(data.user);
          localStorage.setItem('nua_admin_user', JSON.stringify(data.user));
        } else {
          logout();
        }
      } catch (err) {
        console.warn('Auth verification failed:', err);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Login failed. Please check credentials.');
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('nua_admin_token', data.token);
      localStorage.setItem('nua_admin_user', JSON.stringify(data.user));

      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('nua_admin_token');
    localStorage.removeItem('nua_admin_user');
  };

  const isSuperAdmin = user?.privilege === 'super_admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isSuperAdmin,
        apiBase: API_BASE,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
