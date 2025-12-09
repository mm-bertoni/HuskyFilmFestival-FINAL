/* Code troubleshooted and created with Claude:
Anthropic. (2025, Dec 9). *Protected routes with React Router and Passport* [Generative AI chat] Claude Sonnet 4.5 https://claude.ai/share/9318a278-fd5f-425b-94a3-26655ee1c615

*/
import {useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext, useAuth } from './authContext';



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
        // Checks if logged in
      const response = await fetch('/user', {
        credentials: 'include',
      });

      if (response.ok) {
        // If authenticated
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
        // Not authenticated
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

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


// Protected Route Component
export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
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
    return <Navigate to="/filmAdmin" replace />;
  }

  return children;
};

export default ProtectedRoute;