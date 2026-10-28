import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  CalendarDays,
  Users,
  MapPin,
  ShieldCheck,
  Plus,
  ExternalLink,
  ArrowRight,
  Database,
  Cloud,
  Clock,
  Sparkles,
} from 'lucide-react';

export const DashboardOverview = () => {
  const { user, isSuperAdmin, apiBase } = useAuth();
  const [stats, setStats] = useState({
    events: 0,
    upcomingEvents: 0,
    exco: 0,
    reps: 0,
    admins: 0,
  });
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const [eventsRes, committeeRes] = await Promise.all([
          fetch(`${apiBase}/events`),
          fetch(`${apiBase}/committee`),
        ]);

        const eventsData = await eventsRes.json();
        const committeeData = await committeeRes.json();

        const allEvents = eventsData.data || [];
        const allMembers = committeeData.data || [];

        const past = allEvents.filter((e) => e.category !== 'upcoming');
        const upcoming = allEvents.filter((e) => e.category === 'upcoming');
        const excoList = allMembers.filter((m) => m.category === 'exco');
        const repList = allMembers.filter((m) => m.category === 'rep');

        setStats((prev) => ({
          ...prev,
          events: past.length,
          upcomingEvents: upcoming.length,
          exco: excoList.length,
          reps: repList.length,
        }));

        setRecentEvents(allEvents.slice(0, 5));
      } catch (err) {
        console.error('Failed to fetch overview data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, [apiBase]);

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-800/40 p-6 md:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NUA Admin Console</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {user?.name || 'Administrator'}!
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              You are logged in as{' '}
              <strong className="text-emerald-400">{user?.committee_role || 'Executive'}</strong> with{' '}
              <strong className={isSuperAdmin ? 'text-amber-400' : 'text-emerald-400'}>
                {isSuperAdmin ? 'Super Admin' : 'Admin'}
              </strong>{' '}
              privileges. Manage events, committee profiles, and association updates from here.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/events"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>New Event</span>
            </Link>
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-white font-medium px-4 py-2.5 rounded-xl border border-slate-700 transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4 text-slate-400" />
              <span>Live Site</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Past Events */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Past Events
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CalendarDays className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{loading ? '...' : stats.events}</div>
          <p className="text-xs text-slate-500 mt-1">Activities & workshops</p>
        </div>

        {/* Upcoming Events */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Upcoming Events
            </span>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{loading ? '...' : stats.upcomingEvents}</div>
          <p className="text-xs text-slate-500 mt-1">Scheduled next</p>
        </div>

        {/* Exco Members */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Executive Committee
            </span>
            <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{loading ? '...' : stats.exco}</div>
          <p className="text-xs text-slate-500 mt-1">President, Secretary, etc.</p>
        </div>

        {/* Area Reps */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Area Reps
            </span>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{loading ? '...' : stats.reps}</div>
          <p className="text-xs text-slate-500 mt-1">Regional delegates</p>
        </div>
      </div>

      {/* Two Column Layout: Recent Events & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Events List */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">Recent Events</h2>
              <p className="text-xs text-slate-400">Recently registered activities</p>
            </div>
            <Link
              to="/admin/events"
              className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              <span>Manage all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentEvents.length === 0 ? (
            <div className="text-center py-10 bg-slate-950/40 rounded-xl border border-dashed border-slate-800 text-slate-500">
              <CalendarDays className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No events found in Supabase yet.</p>
              <Link
                to="/admin/events"
                className="mt-3 inline-block text-xs font-semibold text-emerald-400 hover:underline"
              >
                + Add your first event
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-800/80">
              {recentEvents.map((event) => (
                <div key={event.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    {event.image_url ? (
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-700"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-slate-500">
                        <CalendarDays className="w-5 h-5" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm text-white truncate">{event.title}</h4>
                      <p className="text-xs text-slate-400 truncate">
                        {event.date} • {event.location || 'Nuwara Eliya'}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 text-[11px] font-semibold px-2.5 py-0.5 rounded-full capitalize ${
                      event.category === 'upcoming'
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                        : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {event.category || 'past'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* System & Cloud Status */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white">System Status</h2>
            <p className="text-xs text-slate-400">Backend & Cloud integration</p>
          </div>

          <div className="space-y-4">
            {/* Supabase DB */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">PostgreSQL DB</div>
                  <div className="text-[11px] text-slate-400">Supabase Connected</div>
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
            </div>

            {/* Storage Bucket */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
                  <Cloud className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Photo Storage</div>
                  <div className="text-[11px] text-slate-400">Bucket: nua-photos</div>
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 ring-4 ring-teal-400/20" />
            </div>

            {/* Security Role */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Session Security</div>
                  <div className="text-[11px] text-slate-400">JWT Encrypted</div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                Active
              </span>
            </div>
          </div>

          {/* Quick shortcuts */}
          <div className="pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Quick Shortcuts
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/admin/events"
                className="text-center p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-xs font-medium text-slate-300 hover:text-white border border-slate-700/50 transition-colors"
              >
                Events
              </Link>
              <Link
                to="/admin/committee"
                className="text-center p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-xs font-medium text-slate-300 hover:text-white border border-slate-700/50 transition-colors"
              >
                Team
              </Link>
              <Link
                to="/admin/settings"
                className="text-center p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-xs font-medium text-slate-300 hover:text-white border border-slate-700/50 transition-colors"
              >
                Settings
              </Link>
              {isSuperAdmin && (
                <Link
                  to="/admin/users"
                  className="text-center p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-xs font-semibold text-amber-300 border border-amber-500/30 transition-colors"
                >
                  Admins
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
