import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag, Eye, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getAllBlogPosts, BlogPost, createBlogPost } from '@/services/db';
import { sampleBlogPosts } from '@/data/sampleBlogPosts';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        let posts = await getAllBlogPosts();
        
        // If no posts exist, populate with sample data
        if (posts.length === 0) {
          console.log('No blog posts found, adding sample data...');
          for (const samplePost of sampleBlogPosts) {
            await createBlogPost(samplePost);
          }
          posts = await getAllBlogPosts();
        }
        
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
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">MvpPeek AI Blog</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <Card key={post.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-sm bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-3">
                {/* Clean date and stats in header */}
                <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Calendar size={12} className="mr-1" />
                    {new Date(post.publishDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center">
                      <Eye size={12} className="mr-1" />
                      {post.views}
                    </span>
                    <span className="flex items-center">
                      <Heart size={12} className="mr-1" />
                      {post.likes}
                    </span>
                  </div>
                </div>
                
                {/* Title with better typography */}
                <CardTitle className="text-lg font-bold leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                  <Link 
                    to={`/blog/${post.id}`}
                    className="block line-clamp-2"
                  >
                    {post.title}
                  </Link>
                </CardTitle>
                
                {/* Author info - simplified */}
                <div className="flex items-center text-sm text-gray-600">
                  <User size={12} className="mr-1.5" />
                  <span className="font-medium">{post.authorName}</span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                {/* Excerpt with better spacing */}
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                
                {/* Tags - more compact and visually appealing */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 2).map(tag => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 2 && (
                      <Badge 
                        variant="secondary" 
                        className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600"
                      >
                        +{post.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Read more button with better styling */}
                <Link to={`/blog/${post.id}`} className="block">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-700 transition-all duration-200"
                  >
                    Read Article
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;