import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';
import { createBlogPost, generateId } from '@/services/db';
import { useToast } from "@/hooks/use-toast";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CreateBlogPost = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: ''
  });
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast({
        title: "Error",
        description: "You must be logged in to create a blog post",
        variant: "destructive"
      });
      return;
    }

    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Error",
        description: "Title and content are required",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);

    try {
      const blogPost = {
        id: generateId(),
        title: formData.title.trim(),
        excerpt: formData.excerpt.trim() || formData.content.substring(0, 150) + '...',
        content: formData.content.trim(),
        authorId: currentUser.id,
        authorName: currentUser.name || currentUser.email,
        publishDate: new Date().toISOString(),
        tags: formData.tags
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0),
        views: 0,
        likes: 0
      };

      await createBlogPost(blogPost);
      
      toast({
        title: "Success!",
        description: "Your blog post has been published"
      });
      
      navigate('/blog');
    } catch (error) {
      console.error('Error creating blog post:', error);
      toast({
        title: "Error",
        description: "Failed to create blog post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const parsedTags = formData.tags
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header />
      <main className="flex-grow">
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

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Create New Blog Post</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsPreview(!isPreview)}
                    className="flex items-center gap-2"
                  >
                    <Eye size={16} />
                    {isPreview ? 'Edit' : 'Preview'}
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSaving || !formData.title.trim() || !formData.content.trim()}
                    className="flex items-center gap-2"
                  >
                    <Save size={16} />
                    {isSaving ? 'Publishing...' : 'Publish'}
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {!isPreview ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <Input
                      id="title"
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter your blog post title..."
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                      Excerpt
                    </label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => handleInputChange('excerpt', e.target.value)}
                      placeholder="Brief summary of your post (optional - will auto-generate if empty)..."
                      rows={3}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                      Content *
                    </label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      placeholder="Write your blog post content here..."
                      rows={12}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <Input
                      id="tags"
                      type="text"
                      value={formData.tags}
                      onChange={(e) => handleInputChange('tags', e.target.value)}
                      placeholder="Enter tags separated by commas (e.g., startup, mvp, technology)..."
                      className="w-full"
                    />
                    {parsedTags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {parsedTags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {/* Preview */}
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                      {formData.title || 'Your blog post title...'}
                    </h1>
                    
                    <div className="text-sm text-gray-500 mb-4">
                      By {currentUser?.name || currentUser?.email} • {new Date().toLocaleDateString()}
                    </div>

                    {parsedTags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {parsedTags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {formData.excerpt && (
                      <p className="text-gray-600 italic mb-6 p-4 bg-gray-50 rounded-lg">
                        {formData.excerpt}
                      </p>
                    )}

                    <div className="prose prose-lg max-w-none">
                      <div 
                        className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                      >
                        {formData.content || 'Your blog post content will appear here...'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateBlogPost;