import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './admin/context/AuthContext';
import { ProtectedRoute, SuperAdminRoute } from './admin/components/ProtectedRoute';
import { LoginPage } from './admin/pages/LoginPage';
import { AdminLayout } from './admin/AdminLayout';
import { DashboardOverview } from './admin/pages/DashboardOverview';
import { EventsManager } from './admin/pages/EventsManager';
import { CommitteeManager } from './admin/pages/CommitteeManager';
import { SiteSettings } from './admin/pages/SiteSettings';
import { AdminUsersManager } from './admin/pages/AdminUsersManager';
import { PublicWebsite } from './pages/PublicWebsite';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Visitor Website */}
          <Route path="/" element={<PublicWebsite />} />

          {/* Admin Login Screen */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* Protected Admin Portal */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="events" element={<EventsManager />} />
              <Route path="committee" element={<CommitteeManager />} />
              <Route path="settings" element={<SiteSettings />} />

              {/* Super Admin Exclusive Route */}
              <Route element={<SuperAdminRoute />}>
                <Route path="users" element={<AdminUsersManager />} />
              </Route>
            </Route>
          </Route>

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
