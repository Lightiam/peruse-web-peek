import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag, Eye, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getAllBlogPosts, BlogPost } from '@/services/db';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Blog = () => {
  const { currentUser } = useAuth();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const posts = await getAllBlogPosts();
        const sortedPosts = posts.sort((a, b) => 
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        );
        setBlogPosts(sortedPosts);
        setFilteredPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  useEffect(() => {
    let filtered = blogPosts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by selected tag
    if (selectedTag) {
      filtered = filtered.filter(post =>
        post.tags.includes(selectedTag)
      );
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedTag, blogPosts]);

  // Get all unique tags
  const allTags = Array.from(
    new Set(blogPosts.flatMap(post => post.tags))
  ).sort();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-between items-center mb-6">
              <div className="flex-1"></div>
              <div className="flex-1 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">MvpPeek AI Blog</h1>
              </div>
              <div className="flex-1 flex justify-end">
                {currentUser && (
                  <Link to="/blog/create">
                    <Button className="flex items-center gap-2">
                      <span>Write Post</span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Insights, tutorials, and stories from the startup community
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button
                variant={selectedTag ? "default" : "outline"}
                onClick={() => setSelectedTag(null)}
              >
                All Posts
              </Button>
            </div>

            {/* Tags Filter */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className="text-xs"
                  >
                    <Tag size={12} className="mr-1" />
                    {tag}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Blog Posts Grid */}
          {filteredPosts.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts found</h3>
                <p className="text-gray-600">
                  {searchTerm || selectedTag
                    ? "Try adjusting your search criteria"
                    : "Be the first to write a blog post!"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        {new Date(post.publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Eye size={14} className="mr-1" />
                          {post.views}
                        </span>
                        <span className="flex items-center">
                          <Heart size={14} className="mr-1" />
                          {post.likes}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2 line-clamp-2">
                      <Link 
                        to={`/blog/${post.id}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </CardTitle>
                    <div className="flex items-center text-sm text-gray-600">
                      <User size={14} className="mr-1" />
                      {post.authorName}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    
                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{post.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    <Link to={`/blog/${post.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        Read More
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;