import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera } from 'lucide-react';
import { getAuthLoginUrl, setAuthToken } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
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
    // Redirect if already logged in
    if (user && !loading) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const handleLogin = async () => {
    // Redirect to backend login endpoint
    const loginUrl = await getAuthLoginUrl();
    window.location.href = loginUrl;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <Card className="w-full max-w-md shadow-large">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center shadow-medium">
            <Camera className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold">Welcome to PhotoVault</CardTitle>
          <CardDescription className="text-base">
            Your personal photo storage with elegant organization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleLogin}
            size="lg"
            className="w-full gradient-primary text-white font-medium shadow-medium hover:shadow-large transition-smooth"
          >
            Sign in with OIDC
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Secure authentication powered by OIDC
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
