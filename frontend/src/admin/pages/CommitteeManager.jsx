import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Users,
  Plus,
  Search,
  Edit2,
  Trash2,
  Upload,
  X,
  User as UserIcon,
  CheckCircle2,
  AlertCircle,
  MapPin,
  GraduationCap,
} from 'lucide-react';

export const CommitteeManager = () => {
  const { token, apiBase } = useAuth();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('exco'); // 'exco' or 'rep'
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [form, setForm] = useState({
    name: '',
    role: '',
    category: 'exco',
    area: '',
    university: '',
    image_url: '',
    display_order: 0,
  });

  // Photo upload
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/committee`);
      const data = await res.json();
      if (data.success) {
        setMembers(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching committee:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [apiBase]);

  const handleOpenModal = (member = null) => {
    if (member) {
      setEditingMember(member);
      setForm({
        name: member.name || '',
        role: member.role || '',
        category: member.category || activeTab,
        area: member.area || '',
        university: member.university || '',
        image_url: member.image_url || '',
        display_order: member.display_order || 0,
      });
    } else {
      setEditingMember(null);
      setForm({
        name: '',
        role: '',
        category: activeTab,
        area: '',
        university: '',
        image_url: '',
        display_order: members.length,
      });
    }
    setUploadError('');
    setModalOpen(true);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('photo', file);

      const res = await fetch(`${apiBase}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Photo upload failed');
      }

      setForm((prev) => ({ ...prev, image_url: data.url }));
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.role) {
      alert('Name and Role/Designation are required.');
      return;
    }

    setSaveLoading(true);
    try {
      const url = editingMember
        ? `${apiBase}/committee/${editingMember.id}`
        : `${apiBase}/committee`;
      const method = editingMember ? 'PUT' : 'POST';

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
        throw new Error(data.message || 'Failed to save member');
      }

      setMessage({ type: 'success', text: `Member ${editingMember ? 'updated' : 'added'} successfully!` });
      setModalOpen(false);
      fetchMembers();
      setTimeout(() => setMessage(null), 4000);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove "${name}" from committee?`)) return;

    try {
      const res = await fetch(`${apiBase}/committee/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete member');
      }

      setMessage({ type: 'success', text: 'Member removed successfully.' });
      fetchMembers();
      setTimeout(() => setMessage(null), 4000);
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredMembers = members.filter((m) => {
    const matchesCategory = m.category === activeTab;
    const matchesSearch =
      m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.area?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.university?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Users className="w-7 h-7 text-emerald-400" />
            <span>Committee & Area Representatives</span>
          </h1>
          <p className="text-sm text-slate-400">
            Manage the executive team and regional delegates displayed on the website.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add {activeTab === 'exco' ? 'Exco Member' : 'Area Rep'}</span>
        </button>
      </div>

      {/* Navigation Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 p-1 bg-slate-950/80 border border-slate-800 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('exco')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'exco'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Executive Committee ({members.filter((m) => m.category === 'exco').length})
          </button>
          <button
            onClick={() => setActiveTab('rep')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'rep'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Area Representatives ({members.filter((m) => m.category === 'rep').length})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search ${activeTab === 'exco' ? 'executive' : 'rep'} by name...`}
            className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          />
        </div>
      </div>

      {/* Members Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm">Loading team members...</p>
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="py-20 text-center bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl">
          <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-300">
            No {activeTab === 'exco' ? 'Executive Committee' : 'Area Representative'} records found
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Click "Add" button above to register team members and upload their official photos.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm hover:border-slate-700 transition-all flex flex-col items-center text-center relative group"
            >
              {/* Photo */}
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-950 border-2 border-emerald-500/30 mb-3 shadow-md">
                {member.image_url ? (
                  <img
                    src={member.image_url}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600">
                    <UserIcon className="w-10 h-10 opacity-40" />
                  </div>
                )}
              </div>

              {/* Info */}
              <h3 className="font-bold text-white text-base leading-snug">{member.name}</h3>
              <p className="text-xs text-emerald-400 font-semibold mt-0.5">{member.role}</p>

              {member.area && (
                <div className="mt-2 text-xs text-slate-400 flex items-center gap-1 justify-center">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{member.area}</span>
                </div>
              )}

              {member.university && (
                <div className="mt-1 text-xs text-slate-400 flex items-center gap-1 justify-center">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                  <span>{member.university}</span>
                </div>
              )}

              {/* Action buttons */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 w-full flex items-center justify-center gap-2">
                <button
                  onClick={() => handleOpenModal(member)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                  title="Edit member"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(member.id, member.name)}
                  className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors"
                  title="Delete member"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
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
              {editingMember ? 'Edit Member' : 'Add Team Member'}
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Enter member credentials and upload their photo (stored in Supabase).
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <option value="exco">Executive Committee (Exco)</option>
                  <option value="rep">Area Representative</option>
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Johnathan Doe"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Designation / Role *
                </label>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder={form.category === 'exco' ? 'e.g. President, Secretary' : 'e.g. Area Representative'}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              {/* Area & University */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {form.category === 'rep' ? 'Assigned Area *' : 'Area / Division'}
                  </label>
                  <input
                    type="text"
                    value={form.area}
                    onChange={(e) => setForm({ ...form, area: e.target.value })}
                    placeholder="e.g. Hatton, Norwood"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    University / Faculty
                  </label>
                  <input
                    type="text"
                    value={form.university}
                    onChange={(e) => setForm({ ...form, university: e.target.value })}
                    placeholder="e.g. University of Peradeniya"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Member Photo
                </label>

                {form.image_url ? (
                  <div className="flex items-center gap-4 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                    <img
                      src={form.image_url}
                      alt="Preview"
                      className="w-16 h-16 rounded-xl object-cover border border-emerald-500/40"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-white font-medium truncate">Photo uploaded</div>
                      <div className="text-[11px] text-slate-400">Stored in Supabase</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, image_url: '' })}
                      className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="relative border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-2xl p-5 text-center bg-slate-950/60 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      disabled={uploadingImage}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {uploadingImage ? (
                      <div className="flex flex-col items-center">
                        <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mb-1.5" />
                        <span className="text-xs text-emerald-400 font-medium">Uploading photo...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="w-6 h-6 text-slate-500 mb-1.5" />
                        <span className="text-xs font-semibold text-slate-300">
                          Click to upload member picture
                        </span>
                        <span className="text-[10px] text-slate-500">Square aspect ratio recommended</span>
                      </div>
                    )}
                  </div>
                )}

                {uploadError && (
                  <div className="mt-2 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{uploadError}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
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
                  disabled={saveLoading || uploadingImage}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 text-sm transition-all disabled:opacity-50"
                >
                  {saveLoading ? 'Saving...' : editingMember ? 'Update Member' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
