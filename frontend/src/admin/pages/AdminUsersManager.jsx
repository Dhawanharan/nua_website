import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  ShieldAlert,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const AdminUsersManager = () => {
  const { user: currentUser, token, apiBase } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    privilege: 'admin',
    committee_role: '',
    phone: '',
    is_active: true,
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/admins`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setAdmins(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching admins:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, [apiBase, token]);

  const handleOpenModal = (admin = null) => {
    if (admin) {
      setEditingAdmin(admin);
      setForm({
        name: admin.name || '',
        email: admin.email || '',
        password: '', // leave blank to keep unchanged
        privilege: admin.privilege || 'admin',
        committee_role: admin.committee_role || '',
        phone: admin.phone || '',
        is_active: admin.is_active ?? true,
      });
    } else {
      setEditingAdmin(null);
      setForm({
        name: '',
        email: '',
        password: '',
        privilege: 'admin',
        committee_role: '',
        phone: '',
        is_active: true,
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.committee_role) {
      alert('Please fill in Name, Email, and Committee Role.');
      return;
    }

    if (!editingAdmin && !form.password) {
      alert('Password is required for new administrator accounts.');
      return;
    }

    setSaving(true);
    try {
      const url = editingAdmin
        ? `${apiBase}/admins/${editingAdmin.id}`
        : `${apiBase}/admins`;
      const method = editingAdmin ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Operation failed');
      }

      setMessage({
        type: 'success',
        text: `Admin ${editingAdmin ? 'updated' : 'created'} successfully!`,
      });
      setModalOpen(false);
      fetchAdmins();
      setTimeout(() => setMessage(null), 4000);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (parseInt(id, 10) === parseInt(currentUser?.id, 10)) {
      alert('You cannot delete your own active account!');
      return;
    }

    if (!window.confirm(`Are you sure you want to delete administrator "${name}"?`)) {
      return;
    }

    try {
      const res = await fetch(`${apiBase}/admins/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete administrator');
      }

      setMessage({ type: 'success', text: 'Admin user deleted successfully.' });
      fetchAdmins();
      setTimeout(() => setMessage(null), 4000);
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredAdmins = admins.filter(
    (a) =>
      a.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.committee_role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-7xl mx-auto">
      {/* Toast Alert */}
      {message && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{message.text}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 border border-amber-500/30 text-amber-300 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Super Admin Restricted Area</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <ShieldAlert className="w-7 h-7 text-amber-400" />
            <span>Administrator Access Control</span>
          </h1>
          <p className="text-sm text-slate-400">
            Create, promote, deactivate, and manage administrator credentials and privileges.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Admin</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search admins by name, email, or role..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          />
        </div>
      </div>

      {/* Admins Table */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm">Loading administrators...</p>
        </div>
      ) : filteredAdmins.length === 0 ? (
        <div className="py-20 text-center bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl">
          <ShieldAlert className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-300">No administrators found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Click "Add New Admin" to provision credentials for an association executive.
          </p>
        </div>
      ) : (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950/70 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3.5 px-5">Admin Profile</th>
                  <th className="py-3.5 px-5">Committee Role</th>
                  <th className="py-3.5 px-5">Privilege</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5">Last Login</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-slate-300">
                {filteredAdmins.map((admin) => {
                  const isCurrent = parseInt(admin.id, 10) === parseInt(currentUser?.id, 10);
                  return (
                    <tr key={admin.id} className="hover:bg-slate-800/40 transition-colors">
                      {/* Name & Email */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center font-bold text-white shrink-0 border border-slate-700">
                            {admin.name?.charAt(0)?.toUpperCase() || 'A'}
                          </div>
                          <div>
                            <div className="font-bold text-white flex items-center gap-1.5">
                              <span>{admin.name}</span>
                              {isCurrent && (
                                <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded font-normal">
                                  You
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-400">{admin.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Committee Role */}
                      <td className="py-4 px-5 font-medium text-white">
                        {admin.committee_role}
                      </td>

                      {/* Privilege */}
                      <td className="py-4 px-5">
                        {admin.privilege === 'super_admin' ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                            <Sparkles className="w-3 h-3" />
                            Super Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                            Admin
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-5">
                        {admin.is_active ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                            Deactivated
                          </span>
                        )}
                      </td>

                      {/* Last Login */}
                      <td className="py-4 px-5 text-xs text-slate-400">
                        {admin.last_login ? (
                          new Date(admin.last_login).toLocaleDateString()
                        ) : (
                          <span className="text-slate-600">Never</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenModal(admin)}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                            title="Edit Admin"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          {!isCurrent && (
                            <button
                              onClick={() => handleDelete(admin.id, admin.name)}
                              className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors"
                              title="Delete Admin"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Admin Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white mb-1">
              {editingAdmin ? 'Edit Administrator' : 'Create Administrator'}
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Configure credentials, committee designation, and administrative access privileges.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Kaviya Selvam"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="admin@nua.lk"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {editingAdmin ? 'New Password (leave empty to keep current)' : 'Password *'}
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder={editingAdmin ? '••••••••••••' : 'Enter strong password'}
                  required={!editingAdmin}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              {/* Committee Role */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Committee Role / Title *
                </label>
                <input
                  type="text"
                  value={form.committee_role}
                  onChange={(e) => setForm({ ...form, committee_role: e.target.value })}
                  placeholder="e.g. President, Secretary, Editor, Project Lead"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              {/* Privilege Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Privilege Level *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, privilege: 'admin' })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      form.privilege === 'admin'
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 shadow'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-sm">Admin</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Manage site content</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setForm({ ...form, privilege: 'super_admin' })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      form.privilege === 'super_admin'
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-sm flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Super Admin</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Manage content & admins</div>
                  </button>
                </div>
              </div>

              {/* Active Toggle (Editing only) */}
              {editingAdmin && (
                <div className="pt-2 flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div>
                    <div className="text-xs font-bold text-white">Account Status</div>
                    <div className="text-[11px] text-slate-400">
                      {form.is_active ? 'User can sign in' : 'Access blocked'}
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.is_active}
                    onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                    className="w-5 h-5 rounded text-emerald-500 focus:ring-emerald-500 bg-slate-900 border-slate-700"
                  />
                </div>
              )}

              {/* Submit Actions */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 text-sm transition-all disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingAdmin ? 'Update Admin' : 'Create Admin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
