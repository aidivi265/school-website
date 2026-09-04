'use client';

import { useState } from 'react';
import { mockEvents } from '@/lib/data/mockData';
import { EventItem } from '@/types';
import { Button, Badge } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { Plus, Edit2, Trash2, Search, X, Calendar, MapPin, Clock } from 'lucide-react';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>(mockEvents);
  const [search, setSearch] = useState('');
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'Academic' as EventItem['category'],
    status: 'upcoming' as EventItem['status'],
    event_date: new Date().toISOString().split('T')[0],
    end_date: '',
    time: '09:00 AM – 01:00 PM',
    venue: 'School Auditorium',
    description: '',
    cover_image_url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
    is_published: true,
  });

  const handleOpenCreate = () => {
    setEditingEvent(null);
    setForm({
      title: '',
      category: 'Academic',
      status: 'upcoming',
      event_date: new Date().toISOString().split('T')[0],
      end_date: '',
      time: '09:00 AM – 01:00 PM',
      venue: 'School Auditorium',
      description: '',
      cover_image_url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ev: EventItem) => {
    setEditingEvent(ev);
    setForm({
      title: ev.title,
      category: ev.category,
      status: ev.status,
      event_date: ev.event_date,
      end_date: ev.end_date || '',
      time: ev.time || '',
      venue: ev.venue || '',
      description: ev.description,
      cover_image_url: ev.cover_image_url || '',
      is_published: ev.is_published !== false,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      setEvents((prev) =>
        prev.map((ev) => (ev.id === editingEvent.id ? { ...ev, ...form, end_date: form.end_date || null } : ev))
      );
    } else {
      const newEvent: EventItem = {
        id: 'ev-' + Date.now(),
        ...form,
        end_date: form.end_date || null,
      };
      setEvents([newEvent, ...events]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter((e) => e.id !== id));
    }
  };

  const filtered = events.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase()) ||
      (e.venue && e.venue.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl text-slate-900">Manage Events & Calendar</h2>
          <p className="text-xs text-slate-500">Plan and publish upcoming school events, fests, and sports meets</p>
        </div>
        <Button onClick={handleOpenCreate} variant="primary" size="md">
          <Plus size={16} /> Add School Event
        </Button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search size={18} className="text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search events by title, category, or venue..."
          className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-slate-900"
        />
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4">Event Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Event Date</th>
                <th className="p-4">Venue</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 max-w-xs font-bold text-slate-900">{e.title}</td>
                  <td className="p-4">
                    <Badge variant="navy">{e.category}</Badge>
                  </td>
                  <td className="p-4 text-slate-600 whitespace-nowrap">{formatDate(e.event_date)}</td>
                  <td className="p-4 text-slate-600">{e.venue || 'Campus'}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        e.status === 'upcoming'
                          ? 'bg-emerald-100 text-emerald-800'
                          : e.status === 'past'
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {e.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleOpenEdit(e)}
                      className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(e.id)}
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="font-serif font-bold text-xl text-slate-900">
                {editingEvent ? 'Edit School Event' : 'Add New Event'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-lg text-slate-400">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Annual Sports Extravaganza – Tarang"
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  >
                    {['Sports', 'Celebration', 'Academic', 'Cultural', 'Workshop', 'Competition'].map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Status *
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="past">Past</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.event_date}
                    onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Event Time
                  </label>
                  <input
                    type="text"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    placeholder="e.g. 08:30 AM – 02:00 PM"
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Venue / Location
                </label>
                <input
                  type="text"
                  value={form.venue}
                  onChange={(e) => setForm({ ...form, venue: e.target.value })}
                  placeholder="e.g. School Sports Complex & Ground"
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Details of activities, schedule, and participation guidelines..."
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={form.cover_image_url}
                  onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <Button type="button" variant="outline" size="md" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md">
                  {editingEvent ? 'Update Event' : 'Save Event'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
