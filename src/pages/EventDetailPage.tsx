import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Share2, Clock } from 'lucide-react';
import { fetchAll } from '../services/supabaseCrud';
import { getEventImages } from '../services/imageUpload';
import { EventImage } from '../lib/types';
import { shareContent, getEventShareUrl, showShareNotification } from '../utils/shareUtils';
import { ShareModal } from '../components/common/ShareModal';

type EventItem = {
  id: string;
  title: string;
  description: string;
  location: string;
  start: string;
  end: string;
  image?: string;
};

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

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [eventImages, setEventImages] = useState<EventImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  useEffect(() => {
    const loadEvent = async () => {
      if (!id) {
        setError('Invalid event ID');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch events
        const eventsFromDB = await fetchAll<EventFromDB>('events');
        const foundEvent = eventsFromDB.find(e => e.id === id);

        if (!foundEvent) {
          setError('Event not found');
          setLoading(false);
          return;
        }

        // Transform to display format
        const transformedEvent: EventItem = {
          id: foundEvent.id,
          title: foundEvent.title,
          description: foundEvent.description,
          location: foundEvent.location,
          start: foundEvent.start_at,
          end: foundEvent.end_at,
          image: foundEvent.image_url,
        };

        setEvent(transformedEvent);

        // Load images for this event
        try {
          const images = await getEventImages(id);
          if (images && images.length > 0) {
            setEventImages(images);
          }
        } catch (imgError) {
          console.warn('Failed to load event images:', imgError);
        }

      } catch (err) {
        console.error('Error loading event:', err);
        setError('Failed to load event');
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  const handleShare = () => {
    if (!event) return;
    setShareModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading event...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The event you\'re looking for doesn\'t exist.'}</p>
          <Link
            to="/insights"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Insights
          </Link>
        </div>
      </div>
    );
  }

  // Get primary image with proper URL handling
  const getImageUrl = (img: EventImage | { url: string } | null | undefined): string | undefined => {
    if (!img) return undefined;
    // Check for different possible URL properties
    if ('url' in img && typeof img.url === 'string') return img.url;
    if ('image_url' in img && typeof (img as EventImage).image_url === 'string') return (img as EventImage).image_url;
    if ('path' in img && typeof (img as Record<string, unknown>).path === 'string') return (img as Record<string, unknown>).path as string;
    if ('publicUrl' in img && typeof (img as Record<string, unknown>).publicUrl === 'string') return (img as Record<string, unknown>).publicUrl as string;
    return undefined;
  };

  const primaryImage = eventImages.find(img => img.is_primary) || eventImages[0] || (event.image ? { url: event.image } : null);
  const primaryImageUrl = getImageUrl(primaryImage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/insights"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Insights
          </Link>
          
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {event.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(event.start)}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {formatTime(event.start)} - {formatTime(event.end)}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
              </div>
            </div>
            
            <div className="ml-4 flex gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
              <a
                href={toGoogleCalendarUrl(event)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Add to Calendar
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Featured Image */}
          {primaryImageUrl && (
            <div className="aspect-[16/9] bg-gray-200">
              <img
                src={primaryImageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            {/* Event Details */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-3 text-blue-600" />
                  <div>
                    <div className="font-medium">Date</div>
                    <div className="text-gray-600">{formatDate(event.start)}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-3 text-blue-600" />
                  <div>
                    <div className="font-medium">Time</div>
                    <div className="text-gray-600">{formatTime(event.start)} - {formatTime(event.end)}</div>
                  </div>
                </div>
                <div className="flex items-center md:col-span-2">
                  <MapPin className="h-4 w-4 mr-3 text-blue-600" />
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-gray-600">{event.location}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: event.description }}
            />

            {/* Additional Images */}
            {eventImages.length > 1 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {eventImages.slice(1).map((image, index) => {
                    const imgUrl = getImageUrl(image);
                    return imgUrl ? (
                      <div key={index} className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={imgUrl}
                          alt={`${event.title} - Image ${index + 2}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Action Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Interested in this event?</h3>
            <p className="text-gray-600 mb-4">Share it with others or add it to your calendar!</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleShare}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share Event
              </button>
              <a
                href={toGoogleCalendarUrl(event)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Add to Calendar
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Share Modal */}
      {event && (
        <ShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          url={getEventShareUrl(event.id, event.title)}
          title={event.title}
          type="event"
        />
      )}
    </div>
  );
};

export default EventDetailPage;