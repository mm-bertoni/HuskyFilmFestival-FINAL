/* Code troubleshooted and created with Claude:
Anthropic. (2025, Dec 9). *Protected routes with React Router and Passport* [Generative AI chat] Claude Sonnet 4.5 https://claude.ai/share/9318a278-fd5f-425b-94a3-26655ee1c615

*/
import { useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext, useAuth } from './authContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    console.log('🔍 checkAuth called');
    try {
      const response = await fetch('/user', {
        credentials: 'include',
      });

      console.log('🔍 checkAuth response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ checkAuth user data:', data);
        setUser(data.user);
      } else {
        console.log('❌ checkAuth failed - no user, status:', response.status);
        setUser(null);
      }
    } catch (error) {
      console.error('💥 Auth check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log('🚀 AuthProvider mounted, calling checkAuth');
    checkAuth();
  }, [checkAuth]);

  const logout = async () => {
    try {
      await fetch('/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  console.log('🛡️ ProtectedRoute render - user:', user, 'loading:', loading);

  if (loading) {
    console.log('⏳ ProtectedRoute: still loading...');
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!user) {
    console.log('🚫 ProtectedRoute: no user, redirecting to /filmAdmin');
    return <Navigate to="/filmAdmin" replace />;
  }

  console.log('✅ ProtectedRoute: user authenticated, rendering children');
  return children;
};

export default ProtectedRoute;