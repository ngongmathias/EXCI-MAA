import React, { useEffect, useState } from 'react';
import { Share2 } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import {fetchAll, insertItem } from '../../../services/supabaseCrud';
import { getPostImages } from '../../../services/imageUpload';
import { PostImage } from '../../../lib/types';
import Pagination from '../../ui/Pagination';
import { shareContent, getBlogPostShareUrl, showShareNotification } from '../../../utils/shareUtils';

type Post = {
  id: string;
  title: string;
  image?: string;
  content: string;
  createdAt: string; // ISO
};

type Comment = {
  name: string;
  message: string;
  createdAt: string; // ISO
};

const BlogSection: React.FC = () => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [postImages, setPostImages] = useState<Record<string, PostImage[]>>({});
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [commentsByPost, setCommentsByPost] = useState<Record<string, Comment[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShare = async (postId: string, title: string) => {
    console.log('Sharing blog post:', postId, title);
    const url = getBlogPostShareUrl(postId, title);
    console.log('Share URL:', url);
    const result = await shareContent({
      url,
      title: `${title} | EXCI-MAA Blog`,
      text: `Check out this blog post: ${title}`,
    });
    
    console.log('Share result:', result);
    showShareNotification(result.message, result.success ? 'success' : 'error');
  };
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const p = await fetchAll<any>('posts');
        setPosts(p.map(x => ({ id: x.id, title: x.title, image: x.image_url, content: x.content, createdAt: x.created_at })));
        
        // Load images for all posts
        const imagesMap: Record<string, PostImage[]> = {};
        await Promise.all(
          p.map(async (post: any) => {
            try {
              const images = await getPostImages(post.id);
              if (images.length > 0) {
                imagesMap[post.id] = images;
              }
            } catch (err) {
              console.warn(`Could not load images for post ${post.id}:`, err);
            }
          })
        );
        setPostImages(imagesMap);
      } catch {
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
      // Best-effort auxiliary data; hide schema errors
      try {
        const c = await fetchAll<any>('comments');
        const grouped: Record<string, Comment[]> = {};
        c.forEach((row) => {
          const k = row.post_id;
          if (!grouped[k]) grouped[k] = [];
          grouped[k].push({ name: row.name, message: row.message, createdAt: row.created_at });
        });
        setCommentsByPost(grouped);
      } catch {}
    };
    load();
  }, []);

  async function addComment(postId: string, comment: Comment) {
    try {
      await insertItem('comments', { post_id: postId, name: comment.name, message: comment.message });
      setCommentsByPost(prev => ({ ...prev, [postId]: [comment, ...(prev[postId] || [])] }));
    } catch (e) {
      console.error(e);
    }
  }

  // Calculate pagination values
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, posts.length);
  const paginatedPosts = posts.slice(startIndex, endIndex);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('insights.blogTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('insights.blogSubtitle')}
          </p>
        </div>

        {loading && <div className="mt-8 text-sm text-gray-600 text-center">Loading posts...</div>}
        {error && <div className="mt-4 text-sm text-red-700 bg-red-50 rounded-md px-3 py-2 text-center">{error}</div>}
        {!loading && posts.length === 0 && (
          <div className="mt-8 text-sm text-gray-600 text-center">No blog posts found.</div>
        )}
        
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedPosts.map(post => {
            const comments = commentsByPost[post.id] || [];
            const images = postImages[post.id] || [];
            const primaryImage = images.find(img => img.is_primary) || images[0];
            const displayImage = primaryImage?.image_url || post.image;
            
            return (
              <article key={post.id} className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition flex flex-col overflow-hidden cursor-pointer" onClick={() => setSelectedPost(post)}>
                {displayImage && (
                  <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                    <img 
                      src={displayImage} 
                      alt={post.title} 
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-300" 
                    />
                    {images.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
                        +{images.length - 1} more
                      </div>
                    )}
                  </div>
                )}
                {!displayImage && (
                  <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                    <svg className="w-20 h-20 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                )}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                  <p className="mt-2 text-sm text-gray-700 flex-1 line-clamp-3">{post.content}</p>
                  <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Share button clicked for blog post:', post.id);
                          handleShare(post.id, post.title);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 z-20 relative border-2 border-white/50 backdrop-blur-sm"
                        aria-label="Share blog post - copy link to clipboard"
                        style={{ minWidth: '90px' }}
                      >
                        <Share2 className="w-4 h-4" />
                        Share
                      </button>
                      <span className="text-blue-600 font-medium">Read more →</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        
        {selectedPost && (
          <BlogDetailModal
            post={selectedPost}
            images={postImages[selectedPost.id] || []}
            comments={commentsByPost[selectedPost.id] || []}
            onClose={() => setSelectedPost(null)}
            onAddComment={(name, message) => addComment(selectedPost.id, { name, message, createdAt: new Date().toISOString() })}
          />
        )}

        {/* Pagination */}
        {posts.length > ITEMS_PER_PAGE && (
          <div className="mt-8 flex flex-col items-center">
            <p className="text-sm text-gray-600 mb-2">
              Showing {startIndex + 1} to {endIndex} of {posts.length} posts
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

const BlogDetailModal: React.FC<{
  post: Post;
  images: PostImage[];
  comments: Comment[];
  onClose: () => void;
  onAddComment: (name: string, message: string) => void;
}> = ({ post, images, comments, onClose, onAddComment }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const primaryImage = images.find(img => img.is_primary) || images[0];
  const displayImage = primaryImage?.image_url || post.image;
  
  const allImages = images.length > 0 
    ? images.map(img => img.image_url)
    : displayImage ? [displayImage] : [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-4xl my-8 rounded-2xl bg-white shadow-2xl transform transition-all" onClick={(e) => e.stopPropagation()}>
        {/* Image Gallery */}
        {allImages.length > 0 && (
          <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-gray-900">
            <img 
              src={allImages[currentImageIndex]} 
              alt={post.title}
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
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h2>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <button
                  onClick={() => {
                    const url = getBlogPostShareUrl(post.id, post.title);
                    shareContent({
                      url,
                      title: `${post.title} | EXCI-MAA Blog`,
                      text: `Check out this blog post: ${post.title}`,
                    }).then(result => {
                      showShareNotification(result.message, result.success ? 'success' : 'error');
                    });
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <Share2 className="w-4 h-4" />
                  Share Post
                </button>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors ml-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="max-h-[50vh] overflow-y-auto pr-2 mb-6">
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{post.content}</p>
            </div>
          </div>

          {/* Comments Section */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Comments ({comments.length})</h3>
            
            <CommentForm onSubmit={onAddComment} />
            
            {comments.length > 0 && (
              <div className="mt-6 space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {comments.map((c, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{c.name}</span>
                      <span className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-700">{c.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CommentForm: React.FC<{ onSubmit: (name: string, message: string) => void }> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const isValid = name.trim().length > 1 && message.trim().length > 2;
  
  const handleSubmit = () => {
    if (isValid) {
      onSubmit(name, message);
      setName('');
      setMessage('');
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="space-y-3">
        <input 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="Your name" 
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
        />
        <textarea 
          value={message} 
          onChange={e => setMessage(e.target.value)} 
          placeholder="Write a comment..." 
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" 
        />
      </div>
      <div className="mt-3 flex justify-end">
        <button 
          disabled={!isValid} 
          onClick={handleSubmit} 
          className={`px-4 py-2 text-sm font-medium rounded-lg text-white transition-colors ${
            isValid 
              ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30' 
              : 'bg-blue-300 cursor-not-allowed'
          }`}
        >
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default BlogSection;


