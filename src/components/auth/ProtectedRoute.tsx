import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: {
    module: string;
    action: string;
  };
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermission,
}) => {
  const { isAuthenticated, isLoading, hasPermission } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner loading={true} message="Authenticating..." overlay />;
  }

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check specific permission if required
  if (requiredPermission) {
    const hasRequiredPermission = hasPermission(
      requiredPermission.module,
      requiredPermission.action
    );

    if (!hasRequiredPermission) {
      // Redirect to dashboard if user doesn't have permission
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;