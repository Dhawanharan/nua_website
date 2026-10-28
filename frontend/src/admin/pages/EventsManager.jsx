import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  CalendarDays,
  Plus,
  Search,
  Edit2,
  Trash2,
  Upload,
  X,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Clock,
} from 'lucide-react';

export const EventsManager = () => {
  const { token, apiBase } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form, setForm] = useState({
    title: '',
    desc: '',
    date: '',
    location: '',
    category: 'past',
    image_url: '',
  });

  // Photo upload state
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/events`);
      const data = await res.json();
      if (data.success) {
        setEvents(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [apiBase]);

  const handleOpenModal = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setForm({
        title: event.title || '',
        desc: event.description || '',
        date: event.date || '',
        location: event.location || '',
        category: event.category || 'past',
        image_url: event.image_url || '',
      });
    } else {
      setEditingEvent(null);
      setForm({
        title: '',
        desc: '',
        date: '',
        location: '',
        category: 'past',
        image_url: '',
      });
    }
    setUploadError('');
    setModalOpen(true);
  };

  const handleImageFileChange = async (e) => {
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
        throw new Error(data.message || 'Image upload failed');
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
    if (!form.title || !form.desc || !form.date) {
      alert('Please fill in Title, Description, and Date.');
      return;
    }

    setSaveLoading(true);
    try {
      const url = editingEvent
        ? `${apiBase}/events/${editingEvent.id}`
        : `${apiBase}/events`;
      const method = editingEvent ? 'PUT' : 'POST';

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
        throw new Error(data.message || 'Failed to save event');
      }

      setMessage({ type: 'success', text: `Event ${editingEvent ? 'updated' : 'created'} successfully!` });
      setModalOpen(false);
      fetchEvents();
      setTimeout(() => setMessage(null), 4000);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete event "${title}"?`)) return;

    try {
      const res = await fetch(`${apiBase}/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete event');
      }

      setMessage({ type: 'success', text: 'Event deleted successfully.' });
      fetchEvents();
      setTimeout(() => setMessage(null), 4000);
    } catch (err) {
      alert(err.message);
    }
  };

  // Filtered Events
  const filteredEvents = events.filter((ev) => {
    const matchesCategory = categoryFilter === 'all' || ev.category === categoryFilter;
    const matchesSearch =
      ev.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.description?.toLowerCase().includes(searchTerm.toLowerCase());
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

      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <CalendarDays className="w-7 h-7 text-emerald-400" />
            <span>Events Management</span>
          </h1>
          <p className="text-sm text-slate-400">
            Create, edit, and organize past workshops, seminars, and upcoming NUA events.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Event</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search events by title or location..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 border border-slate-800 rounded-xl w-full sm:w-auto">
          {[
            { id: 'all', label: 'All' },
            { id: 'past', label: 'Past Events' },
            { id: 'upcoming', label: 'Upcoming' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                categoryFilter === cat.id
                  ? 'bg-emerald-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm">Loading events from database...</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="py-20 text-center bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl">
          <CalendarDays className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-300">No events found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchTerm ? 'Try a different search term.' : 'Click "Add New Event" to register the first event.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:border-slate-700 transition-all flex flex-col group"
            >
              {/* Image banner */}
              <div className="relative h-48 bg-slate-950 overflow-hidden">
                {event.image_url ? (
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 bg-slate-950">
                    <ImageIcon className="w-10 h-10 mb-2 opacity-40" />
                    <span className="text-xs">No image provided</span>
                  </div>
                )}
                {/* Category tag */}
                <span
                  className={`absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-md ${
                    event.category === 'upcoming'
                      ? 'bg-cyan-500/80 text-white'
                      : 'bg-emerald-600/80 text-white'
                  }`}
                >
                  {event.category || 'past'}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs text-emerald-400 font-semibold mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{event.date}</span>
                    {event.location && <span>• {event.location}</span>}
                  </div>
                  <h3 className="font-bold text-white text-base leading-snug line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Card footer actions */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">ID #{event.id}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenModal(event)}
                      className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                      title="Edit Event"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id, event.title)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors"
                      title="Delete Event"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white mb-1">
              {editingEvent ? 'Edit Event' : 'Add New Event'}
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Enter event details and upload a photo directly to Supabase cloud storage.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Event Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. GCE O/L Seminar 2026"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              {/* Category, Date, Location Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  >
                    <option value="past">Past Event</option>
                    <option value="upcoming">Upcoming Event</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Date *</label>
                  <input
                    type="text"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    placeholder="e.g. July, 2026"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g. Wellington T.M.V"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Description *
                </label>
                <textarea
                  rows={3}
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  placeholder="Describe the event, seminar, or workshop..."
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              {/* Photo Upload to Supabase */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Event Photo (Supabase Storage)
                </label>

                {form.image_url ? (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 h-40 mb-3">
                    <img
                      src={form.image_url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, image_url: '' })}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/80 text-red-400 hover:text-white hover:bg-red-600 transition-colors"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="relative border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-2xl p-6 text-center bg-slate-950/60 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      disabled={uploadingImage}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {uploadingImage ? (
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mb-2" />
                        <span className="text-xs text-emerald-400 font-medium">
                          Uploading to Supabase Storage...
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="w-8 h-8 text-slate-500 mb-2" />
                        <span className="text-sm font-semibold text-slate-300">
                          Click or drag photo here to upload
                        </span>
                        <span className="text-xs text-slate-500 mt-1">
                          PNG, JPG, WEBP up to 10MB
                        </span>
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

              {/* Submit Buttons */}
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
                  {saveLoading ? 'Saving...' : editingEvent ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
