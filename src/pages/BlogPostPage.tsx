import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import { fetchAll } from '../services/supabaseCrud';
import { getPostImages } from '../services/imageUpload';
import { PostImage } from '../lib/types';
import { shareContent, getBlogPostShareUrl, showShareNotification } from '../utils/shareUtils';
import { ShareModal } from '../components/common/ShareModal';

type Post = {
  id: string;
  title: string;
  image?: string;
  content: string;
  createdAt: string;
};

type PostFromDB = {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
};

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [postImages, setPostImages] = useState<PostImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    const loadPost = async () => {
      if (!id) {
        setError('Invalid post ID');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch posts
        const postsFromDB = await fetchAll<PostFromDB>('posts');
        const foundPost = postsFromDB.find(p => p.id === id);

        if (!foundPost) {
          setError('Post not found');
          setLoading(false);
          return;
        }

        // Transform to display format
        const transformedPost: Post = {
          id: foundPost.id,
          title: foundPost.title,
          content: foundPost.content,
          image: foundPost.image_url,
          createdAt: foundPost.created_at,
        };

        setPost(transformedPost);

        // Load images for this post
        try {
          const images = await getPostImages(id);
          if (images && images.length > 0) {
            setPostImages(images);
          }
        } catch (imgError) {
          console.warn('Failed to load post images:', imgError);
        }

      } catch (err) {
        console.error('Error loading post:', err);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const handleShare = async () => {
    if (!post) return;
    
    const url = getBlogPostShareUrl(post.id);
    setShareUrl(url);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The blog post you\'re looking for doesn\'t exist.'}</p>
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

  // Get primary image
  const getImageUrl = (img: PostImage | { url: string } | null | undefined): string | undefined => {
    if (!img) return undefined;
    // Check for different possible URL properties
    if ('url' in img && typeof (img as any).url === 'string') return (img as any).url;
    if ('image_url' in img && typeof (img as any).image_url === 'string') return (img as any).image_url;
    if ('path' in img && typeof (img as any).path === 'string') return (img as any).path;
    if ('publicUrl' in img && typeof (img as any).publicUrl === 'string') return (img as any).publicUrl;
    return undefined;
  };

  const primaryImage = postImages.find(img => (img as any).is_primary) || postImages[0] || (post.image ? { url: post.image } : null);
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
                {post.title}
              </h1>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="h-4 w-4 mr-2" />
                {formatDate(post.createdAt)}
              </div>
            </div>
            
            <button
              onClick={handleShare}
              className="ml-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
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
                alt={post.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Additional Images */}
            {postImages.length > 1 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {postImages.slice(1).map((image, index) => {
                    const imgUrl = getImageUrl(image);
                    return imgUrl ? (
                      <div key={index} className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={imgUrl}
                          alt={`${post.title} - Image ${index + 2}`}
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

        {/* Share Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Share this post</h3>
            <p className="text-gray-600 mb-4">Found this interesting? Share it with others!</p>
            <button
              onClick={handleShare}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Share2 className="h-5 w-5 mr-2" />
              Share Post
            </button>
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        url={shareUrl}
        title={post?.title || 'Blog Post'}
        type="blog"
      />
    </div>
  );
};

export default BlogPostPage;