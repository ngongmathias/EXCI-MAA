import React, { useEffect, useMemo, useState } from 'react';
import { Share2 } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { fetchAll, insertItem } from '../../../services/supabaseCrud';
import { getEventImages } from '../../../services/imageUpload';
import { EventImage } from '../../../lib/types';
import Pagination from '../../ui/Pagination';
import { shareContent, getEventShareUrl, showShareNotification } from '../../../utils/shareUtils';

type EventItem = {
  id: string;
  title: string;
  description: string;
  location: string;
  start: string; // ISO string
  end: string;   // ISO string
  image?: string;
};

// Database schema type
type EventFromDB = {
  id: string;
  title: string;
  description: string;
  location: string;
  start_at: string;
  end_at: string;
  image_url?: string;
  created_by?: string;
  created_at: string;
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
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [eventImages, setEventImages] = useState<Record<string, EventImage[]>>({});
  const [attendeesByEvent, setAttendeesByEvent] = useState<Record<string, Attendee[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShare = async (eventId: string, title: string) => {
    console.log('Sharing event:', eventId, title);
    const url = getEventShareUrl(eventId, title);
    console.log('Share URL:', url);
    const result = await shareContent({
      url,
      title: `${title} | EXCI-MAA Event`,
      text: `Join us at this event: ${title}`,
    });
    
    console.log('Share result:', result);
    showShareNotification(result.message, result.success ? 'success' : 'error');
  };
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const eventsFromDB = await fetchAll<EventFromDB>('events');
        // Map database fields to component fields
        const mappedEvents: EventItem[] = eventsFromDB.map(e => ({
          id: e.id,
          title: e.title,
          description: e.description || '',
          location: e.location || 'TBA',
          start: e.start_at,
          end: e.end_at,
          image: e.image_url
        }));
        setEvents(mappedEvents);

        // Load images for all events
        const imagesMap: Record<string, EventImage[]> = {};
        await Promise.all(
          mappedEvents.map(async (event) => {
            try {
              const images = await getEventImages(event.id);
              if (images.length > 0) {
                imagesMap[event.id] = images;
              }
            } catch (err) {
              console.warn(`Could not load images for event ${event.id}:`, err);
            }
          })
        );
        setEventImages(imagesMap);
      } catch (e: any) {
        console.error('Error loading events:', e);
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
      } catch (err) {
        console.warn('Could not load attendees:', err);
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

  const filteredList = filter === 'upcoming' ? upcoming : past;
  
  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredList.length);
  const list = filteredList.slice(startIndex, endIndex);

  async function addAttendee(eventId: string, attendee: Attendee) {
    try {
      await insertItem('event_attendees', { event_id: eventId, name: attendee.name, email: attendee.email });
      setAttendeesByEvent(prev => ({ ...prev, [eventId]: [...(prev[eventId] || []), attendee] }));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            {t('insights.eventsTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            {t('insights.eventsSubtitle')}
          </p>
          <div className="inline-flex rounded-full border border-gray-200 overflow-hidden shadow-sm">
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-6 py-2.5 text-sm font-medium transition-all ${filter === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setFilter('past')}
              className={`px-6 py-2.5 text-sm font-medium transition-all ${filter === 'past' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Past Events
            </button>
          </div>
        </div>

        {loading && <div className="mt-8 text-sm text-gray-600 text-center">Loading events...</div>}
        {error && <div className="mt-4 text-sm text-red-700 bg-red-50 rounded-md px-3 py-2 text-center">{error}</div>}
        {!loading && filteredList.length === 0 && (
          <div className="mt-8 text-sm text-gray-600 text-center">No events found.</div>
        )}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((evt) => {
            const attendees = attendeesByEvent[evt.id] || [];
            const images = eventImages[evt.id] || [];
            const primaryImage = images.find(img => img.is_primary) || images[0];
            const displayImage = primaryImage?.image_url || evt.image;
            
            const gcal = toGoogleCalendarUrl(evt);
            const icsBlob = new Blob([toIcs(evt)], { type: 'text/calendar;charset=utf-8' });
            const icsUrl = URL.createObjectURL(icsBlob);

            return (
              <div key={evt.id} className="group relative rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setSelectedEvent(evt)}>
                {displayImage && (
                  <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                    <img 
                      src={displayImage} 
                      alt={evt.title} 
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    {images.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
                        +{images.length - 1} more
                      </div>
                    )}
                  </div>
                )}
                {!displayImage && (
                  <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <svg className="w-20 h-20 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{evt.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{evt.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{evt.location}</span>
                    </div>
                    <div className="flex items-start text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <div>{new Date(evt.start).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</div>
                        <div className="text-xs">{new Date(evt.start).toLocaleTimeString()} – {new Date(evt.end).toLocaleTimeString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>{attendees.length} {attendees.length === 1 ? 'Attendee' : 'Attendees'}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <a 
                      href={gcal} 
                      target="_blank" 
                      rel="noreferrer" 
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 min-w-[100px] px-3 py-2 text-xs font-medium text-center rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
                    >
                      + Calendar
                    </a>
                    <a 
                      href={icsUrl} 
                      download={`${evt.title}.ics`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 min-w-[100px] px-3 py-2 text-xs font-medium text-center rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 transition-colors"
                    >
                      Download
                    </a>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Event share button clicked for event:', evt.id);
                        handleShare(evt.id, evt.title);
                      }}
                      className="flex-1 min-w-[100px] px-3 py-2 text-sm font-medium text-center rounded-lg bg-blue-600  border-2 border-white/50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 inline-flex items-center justify-center gap-1 z-20 relative text-white backdrop-blur-sm"
                      aria-label="Share event - copy link to clipboard"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); setRsvpOpenFor(evt.id); }} 
                    className="w-full px-4 py-2.5 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    RSVP Now
                  </button>
                  
                  {attendees.length > 0 && (
                    <details className="mt-4 pt-4 border-t border-gray-100">
                      <summary className="text-sm font-medium text-gray-700 cursor-pointer hover:text-blue-600 transition-colors">
                        View {attendees.length} {attendees.length === 1 ? 'Attendee' : 'Attendees'}
                      </summary>
                      <ul className="mt-3 space-y-2">
                        {attendees.map((a, idx) => (
                          <li key={idx} className="flex items-center text-sm bg-gray-50 rounded-lg p-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium text-xs mr-2">
                              {a.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 truncate">{a.name}</div>
                              <div className="text-xs text-gray-500 truncate">{a.email}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {selectedEvent && (
          <EventDetailModal
            event={selectedEvent}
            images={eventImages[selectedEvent.id] || []}
            attendees={attendeesByEvent[selectedEvent.id] || []}
            onClose={() => setSelectedEvent(null)}
            onRsvp={() => { setRsvpOpenFor(selectedEvent.id); setSelectedEvent(null); }}
          />
        )}

        {rsvpOpenFor && (
          <RsvpModal
            onClose={() => setRsvpOpenFor(null)}
            onSubmit={(attendee) => {
              addAttendee(rsvpOpenFor, attendee);
              setRsvpOpenFor(null);
            }}
          />
        )}
        
        {/* Pagination */}
        {filteredList.length > ITEMS_PER_PAGE && (
          <div className="mt-8 flex flex-col items-center">
            <p className="text-sm text-gray-600 mb-2">
              Showing {startIndex + 1} to {endIndex} of {filteredList.length} events
            </p>
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </section>
  );
};

const EventDetailModal: React.FC<{
  event: EventItem;
  images: EventImage[];
  attendees: Attendee[];
  onClose: () => void;
  onRsvp: () => void;
}> = ({ event, images, attendees, onClose, onRsvp }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const primaryImage = images.find(img => img.is_primary) || images[0];
  const displayImage = primaryImage?.image_url || event.image;
  
  const allImages = images.length > 0 
    ? images.map(img => img.image_url)
    : displayImage ? [displayImage] : [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const gcal = toGoogleCalendarUrl(event);
  const icsBlob = new Blob([toIcs(event)], { type: 'text/calendar;charset=utf-8' });
  const icsUrl = URL.createObjectURL(icsBlob);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-4xl my-8 rounded-2xl bg-white shadow-2xl transform transition-all" onClick={(e) => e.stopPropagation()}>
        {/* Image Gallery */}
        {allImages.length > 0 && (
          <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-gray-900">
            <img 
              src={allImages[currentImageIndex]} 
              alt={event.title}
              className="h-full w-full object-contain"
            />
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              </>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="p-8 max-h-[60vh] overflow-y-auto">
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900 flex-1">{event.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors ml-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{event.location}</span>
            </div>
            <div className="flex items-start text-gray-600">
              <svg className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <div className="font-medium">{new Date(event.start).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                <div className="text-sm">{new Date(event.start).toLocaleTimeString()} – {new Date(event.end).toLocaleTimeString()}</div>
              </div>
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{attendees.length} {attendees.length === 1 ? 'Attendee' : 'Attendees'}</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{event.description}</p>
          </div>

          {attendees.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Attendees</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {attendees.map((a, idx) => (
                  <div key={idx} className="flex items-center bg-gray-50 rounded-lg p-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium mr-3">
                      {a.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">{a.name}</div>
                      <div className="text-sm text-gray-500 truncate">{a.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
            <button 
              onClick={onRsvp}
              className="flex-1 min-w-[120px] px-6 py-3 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
            >
              RSVP Now
            </button>
            <a 
              href={gcal} 
              target="_blank" 
              rel="noreferrer"
              className="flex-1 min-w-[120px] px-6 py-3 text-sm font-medium text-center rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
            >
              + Calendar
            </a>
            <a 
              href={icsUrl} 
              download={`${event.title}.ics`}
              className="flex-1 min-w-[120px] px-6 py-3 text-sm font-medium text-center rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 transition-colors"
            >
              Download
            </a>
            <button
              onClick={() => {
                console.log('Sharing event from modal:', event.id, event.title);
                const url = getEventShareUrl(event.id, event.title);
                shareContent({
                  url,
                  title: `${event.title} | EXCI-MAA Event`,
                  text: `Join us at this event: ${event.title}`,
                }).then(result => {
                  console.log('Event share result:', result);
                  showShareNotification(result.message, result.success ? 'success' : 'error');
                });
              }}
              className="flex-1 min-w-[120px] px-6 py-3 text-sm font-medium text-center rounded-lg bg-blue-600  text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center justify-center gap-2"
              aria-label="Share event - copy link to clipboard"
            >
              <Share2 className="w-4 h-4" />
              Share Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RsvpModal: React.FC<{ onClose: () => void; onSubmit: (a: Attendee) => void }> = ({ onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const isValid = name.trim().length > 1 && /.+@.+/.test(email);
  
  const handleSubmit = async () => {
    if (!isValid) return;
    setSubmitting(true);
    try {
      await onSubmit({ name, email });
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-2xl font-bold text-gray-900">RSVP for Event</h4>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-6">Please provide your details to confirm your attendance.</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              placeholder="John Doe" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
            <input 
              type="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              placeholder="john@example.com" 
            />
          </div>
        </div>
        <div className="mt-8 flex items-center gap-3">
          <button 
            onClick={onClose} 
            className="flex-1 px-4 py-3 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button 
            disabled={!isValid || submitting} 
            onClick={handleSubmit} 
            className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg text-white transition-all ${
              isValid && !submitting
                ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30' 
                : 'bg-blue-300 cursor-not-allowed'
            }`}
          >
            {submitting ? 'Confirming...' : 'Confirm RSVP'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsSection;


