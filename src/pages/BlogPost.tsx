import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Eye, Heart, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getBlogPostById, updateBlogPost, BlogPost } from '@/services/db';
import { useToast } from "@/hooks/use-toast";

const BlogPostView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!id) {
        navigate('/blog');
        return;
      }

      try {
        const post = await getBlogPostById(id);
        if (post) {
          setBlogPost(post);
          // Update view count
          const updatedPost = { ...post, views: post.views + 1 };
          await updateBlogPost(updatedPost);
          setBlogPost(updatedPost);
        } else {
          navigate('/blog');
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        navigate('/blog');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPost();
  }, [id, navigate]);

  const handleLike = async () => {
    if (!blogPost) return;

    try {
      const updatedPost = {
        ...blogPost,
        likes: isLiked ? blogPost.likes - 1 : blogPost.likes + 1
      };
      
      await updateBlogPost(updatedPost);
      setBlogPost(updatedPost);
      setIsLiked(!isLiked);
      
      toast({
        title: isLiked ? "Removed like" : "Liked!",
        description: isLiked ? "You unliked this post" : "You liked this post"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update like",
        variant: "destructive"
      });
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: blogPost?.title,
        text: blogPost?.excerpt,
        url: window.location.href,
      });
    } catch (error) {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Blog post URL copied to clipboard"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Blog Post Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">The blog post you're looking for doesn't exist.</p>
            <Link to="/blog">
              <Button>
                <ArrowLeft size={16} className="mr-2" />
                Back to Blog
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Navigation */}
      <div className="mb-6">
        <Link to="/blog">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Blog
          </Button>
        </Link>
      </div>

      {/* Blog Post */}
      <article>
        <Card className="overflow-hidden">
          <CardHeader className="pb-6">
            {/* Meta Information */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <User size={14} className="mr-1" />
                  {blogPost.authorName}
                </div>
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {new Date(blogPost.publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <Eye size={14} className="mr-1" />
                  {blogPost.views} views
                </span>
                <span className="flex items-center">
                  <Heart size={14} className="mr-1" />
                  {blogPost.likes} likes
                </span>
              </div>
            </div>

            {/* Title */}
            <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {blogPost.title}
            </CardTitle>

            {/* Tags */}
            {blogPost.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4">
                {blogPost.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="flex items-center">
                    <Tag size={12} className="mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardHeader>

          <CardContent className="prose prose-lg max-w-none">
            {/* Content */}
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blogPost.content.replace(/\n/g, '<br />') }}
            />
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Button
              variant={isLiked ? "default" : "outline"}
              onClick={handleLike}
              className="flex items-center gap-2"
            >
              <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
              {isLiked ? 'Liked' : 'Like'} ({blogPost.likes})
            </Button>
            
            <Button
              variant="outline"
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Share2 size={16} />
              Share
            </Button>
          </div>

          <div className="text-sm text-gray-500">
            Published on {new Date(blogPost.publishDate).toLocaleDateString()}
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPostView;