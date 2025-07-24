import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: ('artist' | 'client' | 'moderator')[];
  requireVerification?: boolean;
  requireApplication?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  roles,
  requireVerification = false,
  requireApplication = false
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireVerification && !user.isVerified) {
    return <Navigate to="/verify-account" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (requireApplication && user.role === 'artist' && !user.hasCompletedApplication) {
    // Check if user has submitted application but it's not approved yet
    return <Navigate to="/artist/application-status" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;