import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import {fetchAll, insertItem } from '../../../services/supabaseCrud';

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
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [commentsByPost, setCommentsByPost] = useState<Record<string, Comment[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const p = await fetchAll<any>('posts');
        setPosts(p.map(x => ({ id: x.id, title: x.title, image: x.image_url, content: x.content, createdAt: x.created_at })));
        const c = await fetchAll<any>('comments');
        const grouped: Record<string, Comment[]> = {};
        c.forEach((row) => {
          const k = row.post_id;
          if (!grouped[k]) grouped[k] = [];
          grouped[k].push({ name: row.name, message: row.message, createdAt: row.created_at });
        });
        setCommentsByPost(grouped);
        const l = await fetchAll<any>('likes');
        const likeCounts: Record<string, number> = {};
        l.forEach(row => { likeCounts[row.post_id] = (likeCounts[row.post_id] || 0) + 1; });
        setLikes(likeCounts);
      } catch (e: any) {
        setError(e.message || 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  async function like(postId: string) {
    try {
      await insertItem('likes', { post_id: postId, user_identifier: 'anon' });
      setLikes(prev => ({ ...prev, [postId]: (prev[postId] || 0) + 1 }));
    } catch (e) {
      console.error(e);
    }
  }

  async function addComment(postId: string, comment: Comment) {
    try {
      await insertItem('comments', { post_id: postId, name: comment.name, message: comment.message });
      setCommentsByPost(prev => ({ ...prev, [postId]: [comment, ...(prev[postId] || [])] }));
    } catch (e) {
      console.error(e);
    }
  }

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
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => {
            const postLikes = likes[post.id] || 0;
            const comments = commentsByPost[post.id] || [];
            return (
              <article key={post.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition flex flex-col">
                {post.image && (
                  <div className="aspect-video w-full overflow-hidden rounded-md bg-gray-100">
                    <img src={post.image} alt={post.title} className="h-full w-full object-contain" />
                  </div>
                )}
                <h3 className="mt-3 text-lg font-semibold text-gray-900">{post.title}</h3>
                <p className="mt-2 text-sm text-gray-700 flex-1">{post.content}</p>
                <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                  <span>{new Date(post.createdAt).toLocaleString()}</span>
                  <button onClick={() => like(post.id)} className="px-3 py-1.5 rounded-md border border-pink-200 bg-pink-50 text-pink-700 hover:bg-pink-100">❤ {postLikes}</button>
                </div>

                <details className="mt-4">
                  <summary className="text-sm text-gray-700 cursor-pointer">Comments ({comments.length})</summary>
                  <CommentForm onSubmit={(name, message) => addComment(post.id, { name, message, createdAt: new Date().toISOString() })} />
                  <ul className="mt-3 space-y-3">
                    {comments.map((c, idx) => (
                      <li key={idx} className="rounded-md border border-gray-200 p-3">
                        <div className="text-sm font-medium text-gray-900">{c.name}</div>
                        <div className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</div>
                        <p className="mt-1 text-sm text-gray-700">{c.message}</p>
                      </li>
                    ))}
                  </ul>
                </details>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const CommentForm: React.FC<{ onSubmit: (name: string, message: string) => void }> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const isValid = name.trim().length > 1 && message.trim().length > 2;
  return (
    <div className="mt-3 rounded-md border border-gray-200 p-3">
      <div className="grid gap-2 sm:grid-cols-2">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Write a comment" className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div className="mt-2 flex justify-end">
        <button disabled={!isValid} onClick={() => isValid && (onSubmit(name, message), setName(''), setMessage(''))} className={`px-3 py-1.5 text-sm rounded-md text-white ${isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'}`}>Post</button>
      </div>
    </div>
  );
};

export default BlogSection;


