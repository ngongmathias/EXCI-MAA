import React, { useState } from 'react';
import { X, Copy, Check, Share2 } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
  type: 'blog' | 'event';
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  url,
  title,
  type
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackError) {
        console.error('Failed to copy URL:', fallbackError);
      }
      
      document.body.removeChild(textArea);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Share2 className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Share {type === 'blog' ? 'Blog Post' : 'Event'}
            </h3>
            <p className="text-sm text-gray-500">
              Share this {type === 'blog' ? 'blog post' : 'event'} with others
            </p>
          </div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Title:</p>
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            {title}
          </p>
        </div>

        {/* URL Section */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">Share Link:</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-sm text-gray-600 break-all">
                {url}
              </p>
            </div>
            <button
              onClick={handleCopyLink}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                copied
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-800">
            <strong>How to share:</strong> Click "Copy" to copy the link to your clipboard, 
            then paste it in your messages, emails, or social media posts.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
          {!copied && (
            <button
              onClick={handleCopyLink}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy Link
            </button>
          )}
        </div>
      </div>
    </div>
  );
};