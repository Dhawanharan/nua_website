import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Settings,
  ShieldAlert,
  LogOut,
  ExternalLink,
  Menu,
  X,
  UserCheck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import nuaLogo from '../assets/logo.png';

export const AdminLayout = () => {
  const { user, logout, isSuperAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { name: 'Events Manager', path: '/admin/events', icon: CalendarDays },
    { name: 'Committee & Reps', path: '/admin/committee', icon: Users },
    { name: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  if (isSuperAdmin) {
    navItems.push({
      name: 'Admin Users',
      path: '/admin/users',
      icon: ShieldAlert,
      badge: 'Super Only',
    });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <img src={nuaLogo} alt="NUA" className="w-8 h-8 object-contain" />
          <span className="font-bold text-white text-sm">NUA Portal</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } md:flex flex-col w-full md:w-64 bg-slate-900/90 border-r border-slate-800 shrink-0 min-h-screen z-20`}
      >
        {/* Brand */}
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-md shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center p-1">
              <img src={nuaLogo} alt="NUA" className="w-full h-full object-contain" />
            </div>
          </div>
          <div>
            <h2 className="font-bold text-white leading-tight">NUA Portal</h2>
            <p className="text-[11px] text-slate-400 font-medium">Administration V2</p>
          </div>
        </div>

        {/* Current Admin Profile Card */}
        <div className="p-4 mx-3 my-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex items-center gap-3">
            {/* Avatar / Photo */}
            <div className="relative shrink-0">
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.name}
                  className="w-11 h-11 rounded-xl object-cover border border-emerald-500/40 shadow-sm"
                />
              ) : (
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-base shadow-sm">
                  {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                </div>
              )}
              {isSuperAdmin ? (
                <span className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 p-0.5 rounded-full ring-2 ring-slate-900">
                  <ShieldCheck className="w-3 h-3" />
                </span>
              ) : (
                <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-0.5 rounded-full ring-2 ring-slate-900">
                  <UserCheck className="w-3 h-3" />
                </span>
              )}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-white text-sm truncate">{user?.name}</div>
              <div className="text-xs text-slate-400 truncate">{user?.committee_role || 'Executive'}</div>
            </div>
          </div>

          {/* Role Badge */}
          <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-slate-700/50">
            <span className="text-[11px] text-slate-400">Privilege:</span>
            {isSuperAdmin ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3" />
                Super Admin
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                Admin
              </span>
            )}
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && !isActive && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom links */}
        <div className="p-3 border-t border-slate-800 space-y-1">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800/70 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span>Public Website</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold">Live</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors font-medium text-left"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-slate-950 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
