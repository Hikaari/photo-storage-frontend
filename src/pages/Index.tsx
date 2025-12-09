import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Gallery from './Gallery';
import { getAuthLoginUrl, setAuthToken } from '@/lib/api';

const Index = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading, refreshUser } = useAuth();


  useEffect(() => {
    // Check if we have a token in the URL (from OAuth callback)
    const token = searchParams.get('token');
    if (token) {
      setAuthToken(token);
      refreshUser().then(() => {
        navigate('/');
      });
    }
  }, [searchParams, navigate, refreshUser]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <Gallery />;
};

export default Index;
