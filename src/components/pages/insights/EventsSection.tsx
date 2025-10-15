import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { fetchAll, insertItem } from '../../../services/supabaseCrud';

type EventItem = {
  id: string;
  title: string;
  description: string;
  location: string;
  start: string; // ISO string
  end: string;   // ISO string
  image?: string;
};

type Attendee = {
  name: string;
  email: string;
};

function toGoogleCalendarUrl(evt: EventItem): string {
  const formatDate = (iso: string) => iso.replace(/[-:]/g, '').split('.')[0] + 'Z';
  const dates = `${formatDate(evt.start)}/${formatDate(evt.end)}`;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: evt.title,
    dates,
    details: evt.description,
    location: evt.location,
  });
  return `https://www.google.com/calendar/render?${params.toString()}`;
}

function toIcs(evt: EventItem): string {
  const dt = (iso: string) => iso.replace(/[-:]/g, '').split('.')[0] + 'Z';
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//EXCI-MAA//Insights Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${evt.id}@excimaa`,
    `DTSTAMP:${dt(new Date().toISOString())}`,
    `DTSTART:${dt(evt.start)}`,
    `DTEND:${dt(evt.end)}`,
    `SUMMARY:${evt.title}`,
    `DESCRIPTION:${evt.description}`,
    `LOCATION:${evt.location}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

const EventsSection: React.FC = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');
  const [rsvpOpenFor, setRsvpOpenFor] = useState<string | null>(null);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [attendeesByEvent, setAttendeesByEvent] = useState<Record<string, Attendee[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const evts = await fetchAll<EventItem>('events');
        setEvents(evts as any);
      } catch (e: any) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
      // Best-effort attendees load; do not surface schema errors to end-users
      try {
        const atts = await fetchAll<{ event_id: string; name: string; email: string }>('event_attendees');
        const grouped: Record<string, Attendee[]> = {};
        atts.forEach(a => {
          const k = (a as any).event_id;
          if (!grouped[k]) grouped[k] = [];
          grouped[k].push({ name: (a as any).name, email: (a as any).email });
        });
        setAttendeesByEvent(grouped);
      } catch {
        // silently ignore if table not present
      }
    };
    load();
  }, []);

  const now = Date.now();
  const { upcoming, past } = useMemo(() => {
    const upcoming = events.filter(e => new Date(e.start).getTime() >= now).sort((a, b) => +new Date(a.start) - +new Date(b.start));
    const past = events.filter(e => new Date(e.start).getTime() < now).sort((a, b) => +new Date(b.start) - +new Date(a.start));
    return { upcoming, past };
  }, [now, events]);

  const list = filter === 'upcoming' ? upcoming : past;

  async function addAttendee(eventId: string, attendee: Attendee) {
    try {
      await insertItem('event_attendees', { event_id: eventId, name: attendee.name, email: attendee.email });
      setAttendeesByEvent(prev => ({ ...prev, [eventId]: [...(prev[eventId] || []), attendee] }));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            {t('insights.eventsTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            {t('insights.eventsSubtitle')}
          </p>
          <div className="inline-flex rounded-full border border-gray-200 overflow-hidden">
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-4 py-2 text-sm font-medium transition ${filter === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('past')}
              className={`px-4 py-2 text-sm font-medium transition ${filter === 'past' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Past
            </button>
          </div>
        </div>

        {loading && <div className="mt-8 text-sm text-gray-600 text-center">Loading events...</div>}
        {error && <div className="mt-4 text-sm text-red-700 bg-red-50 rounded-md px-3 py-2 text-center">{error}</div>}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((evt) => {
            const attendees = attendeesByEvent[evt.id] || [];
            const gcal = toGoogleCalendarUrl(evt);
            const icsBlob = new Blob([toIcs(evt)], { type: 'text/calendar;charset=utf-8' });
            const icsUrl = URL.createObjectURL(icsBlob);

            return (
              <div key={evt.id} className="group relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
                {evt.image && (
                  <div className="aspect-video w-full overflow-hidden rounded-md bg-gray-100">
                    <img src={evt.image} alt={evt.title} className="h-full w-full object-contain" />
                  </div>
                )}
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-gray-900">{evt.title}</h3>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">{evt.description}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    <div>📍 {evt.location}</div>
                    <div>🗓 {new Date(evt.start).toLocaleString()} – {new Date(evt.end).toLocaleTimeString()}</div>
                    <div>👥 Attendees: {attendees.length}</div>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <a href={gcal} target="_blank" rel="noreferrer" className="px-3 py-1.5 text-sm rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200">Add to Google</a>
                    <a href={icsUrl} download={`${evt.title}.ics`} className="px-3 py-1.5 text-sm rounded-md bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200">Download ICS</a>
                    <button onClick={() => setRsvpOpenFor(evt.id)} className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">Sign up</button>
                  </div>
                  {attendees.length > 0 && (
                    <details className="mt-3">
                      <summary className="text-sm text-gray-700 cursor-pointer">View attendees</summary>
                      <ul className="mt-2 space-y-1 text-sm text-gray-600">
                        {attendees.map((a, idx) => (
                          <li key={idx}>{a.name} ({a.email})</li>
                        ))}
                      </ul>
                    </details>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {rsvpOpenFor && (
          <RsvpModal
            onClose={() => setRsvpOpenFor(null)}
            onSubmit={(attendee) => {
              addAttendee(rsvpOpenFor, attendee);
              setRsvpOpenFor(null);
            }}
          />
        )}
      </div>
    </section>
  );
};

const RsvpModal: React.FC<{ onClose: () => void; onSubmit: (a: Attendee) => void }> = ({ onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const isValid = name.trim().length > 1 && /.+@.+/.test(email);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h4 className="text-lg font-semibold text-gray-900">Sign up for event</h4>
        <p className="mt-1 text-sm text-gray-600">Provide your details to RSVP.</p>
        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-sm text-gray-700">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Jane Doe" />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="jane@example.com" />
          </div>
        </div>
        <div className="mt-5 flex items-center justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1.5 text-sm rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">Cancel</button>
          <button disabled={!isValid} onClick={() => isValid && onSubmit({ name, email })} className={`px-3 py-1.5 text-sm rounded-md text-white ${isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'}`}>Confirm RSVP</button>
        </div>
      </div>
    </div>
  );
};

export default EventsSection;


