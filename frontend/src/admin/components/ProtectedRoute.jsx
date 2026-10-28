import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = () => {
  const { user, token, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-400 font-medium">Verifying authorization...</p>
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export const SuperAdminRoute = () => {
  const { user, isSuperAdmin } = useAuth();

  if (!isSuperAdmin) {
    return (
      <div className="p-8 text-center bg-slate-900 border border-red-500/30 rounded-2xl max-w-xl mx-auto my-12 text-white">
        <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
          !
        </div>
        <h2 className="text-2xl font-bold mb-2">Access Restricted</h2>
        <p className="text-slate-400 mb-6">
          This section is exclusively reserved for <strong>Super Admins</strong>. Your current role is{' '}
          <span className="text-emerald-400 font-semibold">{user?.privilege || 'Admin'}</span>.
        </p>
      </div>
    );
  }

  return <Outlet />;
};
