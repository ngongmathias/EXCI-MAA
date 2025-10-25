/**
 * Share utility for web sharing and clipboard fallback
 */
interface ShareOptions {
  url: string;
  title: string;
  text?: string;
}

interface ShareResult {
  success: boolean;
  method: 'native' | 'clipboard' | 'error';
  message: string;
}

/**
 * Shares content using Web Share API if available, otherwise copies to clipboard
 */
export async function shareContent(options: ShareOptions): Promise<ShareResult> {
  const { url, title, text } = options;
  
  console.log('shareContent called with:', { url, title, text });
  console.log('Web Share API supported:', !!navigator.share);
  console.log('Clipboard API supported:', !!navigator.clipboard);
  console.log('Is secure context:', window.isSecureContext);

  // Check if Web Share API is supported (mobile devices, some desktop browsers)
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text: text || title,
        url,
      });
      return {
        success: true,
        method: 'native',
        message: 'Shared successfully!',
      };
    } catch (error) {
      // User cancelled or sharing failed
      if (error instanceof Error && error.name === 'AbortError') {
        return {
          success: false,
          method: 'native',
          message: 'Share cancelled',
        };
      }
      // Fall back to clipboard
    }
  }

  // Fallback: Copy to clipboard
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(url);
      console.log('Successfully copied to clipboard:', url);
      return {
        success: true,
        method: 'clipboard',
        message: 'Link copied to clipboard! You can now paste it anywhere to share.',
      };
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  }

  // Last fallback: Create temporary input element (for older browsers)
  try {
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    if (successful) {
      console.log('Successfully copied using fallback method:', url);
      return {
        success: true,
        method: 'clipboard',
        message: 'Link copied to clipboard! You can now paste it anywhere to share.',
      };
    }
  } catch (error) {
    console.error('Failed to copy using fallback method:', error);
  }

  return {
    success: false,
    method: 'error',
    message: 'Unable to share. Please copy the URL manually.',
  };
}

/**
 * Generates a shareable URL for a blog post
 */
export function getBlogPostShareUrl(postId: string, title?: string): string {
  const baseUrl = window.location.origin;
  const postUrl = `${baseUrl}/insights/blog/${postId}`;
  return postUrl;
}

/**
 * Generates a shareable URL for an event
 */
export function getEventShareUrl(eventId: string, title?: string): string {
  const baseUrl = window.location.origin;
  const eventUrl = `${baseUrl}/insights/events/${eventId}`;
  return eventUrl;
}

/**
 * Shows a toast notification (simple implementation)
 */
export function showShareNotification(message: string, type: 'success' | 'error' = 'success') {
  // Create a simple toast notification
  const toast = document.createElement('div');
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateY(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.transform = 'translateY(-100px)';
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, 3000);
}