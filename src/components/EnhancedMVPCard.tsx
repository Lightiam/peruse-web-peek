import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, TrendingUp, Eye, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import InlinePreview from './InlinePreview';
import {
  MVP,
  Like,
  createLike,
  deleteLike,
  getUserLikeForMVP,
  updateMVP,
  generateId
} from '@/services/db';

interface EnhancedMVPCardProps {
  mvp: MVP;
  onMVPUpdate?: (updatedMVP: MVP) => void;
  onCommentClick?: (mvpId: string) => void;
}

const EnhancedMVPCard: React.FC<EnhancedMVPCardProps> = ({ 
  mvp, 
  onMVPUpdate, 
  onCommentClick 
}) => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [likeId, setLikeId] = useState<string | null>(null);

  useEffect(() => {
    const checkUserLike = async () => {
      if (currentUser) {
        const userLike = await getUserLikeForMVP(mvp.id, currentUser.id);
        if (userLike) {
          setIsLiked(true);
          setLikeId(userLike.id);
        }
      }
    };
    
    checkUserLike();
  }, [mvp.id, currentUser]);

  // Real-time social interactions without page refresh
  const socialFeatures = {
    like: async (mvpId: string) => {
      if (!currentUser) {
        toast({
          title: "Authentication required",
          description: "Please sign in to like MVPs",
          variant: "destructive"
        });
        return;
      }

      try {
        if (isLiked && likeId) {
          // Unlike
          await deleteLike(likeId);
          setIsLiked(false);
          setLikeId(null);
          
          const updatedMVP = { ...mvp, upvotes: mvp.upvotes - 1 };
          await updateMVP(updatedMVP);
          onMVPUpdate?.(updatedMVP);
          
          toast({
            title: "Removed like",
            description: "You unliked this MVP"
          });
        } else {
          // Like
          const newLike: Like = {
            id: generateId(),
            mvpId,
            userId: currentUser.id,
            timestamp: new Date().toISOString()
          };
          
          await createLike(newLike);
          setIsLiked(true);
          setLikeId(newLike.id);
          
          const updatedMVP = { ...mvp, upvotes: mvp.upvotes + 1 };
          await updateMVP(updatedMVP);
          onMVPUpdate?.(updatedMVP);
          
          toast({
            title: "Liked!",
            description: "You liked this MVP"
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update like",
          variant: "destructive"
        });
      }
    },

    comment: (mvpId: string) => {
      onCommentClick?.(mvpId);
    },

    repost: async (mvpId: string) => {
      if (!currentUser) {
        toast({
          title: "Authentication required",
          description: "Please sign in to repost MVPs",
          variant: "destructive"
        });
        return;
      }

      try {
        const updatedMVP = { ...mvp, reposts: mvp.reposts + 1 };
        await updateMVP(updatedMVP);
        onMVPUpdate?.(updatedMVP);
        
        toast({
          title: "Reposted!",
          description: "MVP shared to your timeline"
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to repost",
          variant: "destructive"
        });
      }
    },

    upvote: async (mvpId: string) => {
      if (!currentUser) {
        toast({
          title: "Authentication required",
          description: "Please sign in to upvote MVPs",
          variant: "destructive"
        });
        return;
      }

      try {
        const updatedMVP = { ...mvp, upvotes: mvp.upvotes + 1 };
        await updateMVP(updatedMVP);
        onMVPUpdate?.(updatedMVP);
        
        toast({
          title: "Upvoted!",
          description: "Boosted in rankings"
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to upvote",
          variant: "destructive"
        });
      }
    }
  };

  const handlePreviewClick = async () => {
    setShowPreview(!showPreview);
    
    // Update view count
    try {
      const updatedMVP = { ...mvp, views: mvp.views + 1 };
      await updateMVP(updatedMVP);
      onMVPUpdate?.(updatedMVP);
    } catch (error) {
      console.error('Failed to update view count:', error);
    }
  };

  const handleVisitWebsite = () => {
    const formattedUrl = mvp.websiteUrl.startsWith('http') ? mvp.websiteUrl : `https://${mvp.websiteUrl}`;
    window.open(formattedUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        {/* MVP Image */}
        <div className="aspect-[16/9] overflow-hidden bg-gray-100">
          <img 
            src={mvp.imageUrl} 
            alt={`${mvp.title} preview`} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={handlePreviewClick}
          />
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-white/90 text-gray-800">
            {mvp.category}
          </Badge>
        </div>

        {/* Ranking Badge */}
        {mvp.ranking && mvp.ranking > 50 && (
          <div className="absolute top-2 left-2">
            <Badge variant="default" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <TrendingUp size={12} className="mr-1" />
              #{Math.round(mvp.ranking)}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6 space-y-6">
        {/* Title and Description */}
        <div className="space-y-3">
          <h3 className="font-bold text-lg text-gray-900 leading-tight">
            {mvp.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {mvp.description.length > 100 
              ? `${mvp.description.substring(0, 100)}...` 
              : mvp.description}
          </p>
        </div>

        {/* Technologies */}
        {mvp.technologies && mvp.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {mvp.technologies.slice(0, 3).map((tech, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {mvp.technologies.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{mvp.technologies.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Social Stats */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <span className="flex items-center gap-1.5">
                <Heart size={14} />
                <span className="font-medium">{mvp.upvotes}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MessageCircle size={14} />
                <span className="font-medium">{mvp.comments}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Share2 size={14} />
                <span className="font-medium">{mvp.reposts}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Eye size={14} />
                <span className="font-medium">{mvp.views}</span>
              </span>
            </div>
          </div>
          <div className="text-xs text-gray-400 font-medium">
            Created by {mvp.creatorName}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => socialFeatures.like(mvp.id)}
              className={`flex items-center gap-2 px-3 py-2 ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:bg-gray-50`}
            >
              <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
              <span className="text-sm">Like</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => socialFeatures.comment(mvp.id)}
              className="flex items-center gap-2 px-3 py-2 text-gray-500 hover:bg-gray-50"
            >
              <MessageCircle size={16} />
              <span className="text-sm">Comment</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => socialFeatures.repost(mvp.id)}
              className="flex items-center gap-2 px-3 py-2 text-gray-500 hover:bg-gray-50"
            >
              <Share2 size={16} />
              <span className="text-sm">Share</span>
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviewClick}
              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-4 py-2"
            >
              Preview
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVisitWebsite}
              className="flex items-center text-gray-500 hover:text-blue-600 hover:bg-gray-50 p-2"
              title="Visit website"
            >
              <ExternalLink size={16} />
            </Button>
          </div>
        </div>

        {/* Inline Preview */}
        {showPreview && (
          <div className="mt-4">
            <InlinePreview
              url={mvp.websiteUrl}
              onClose={() => setShowPreview(false)}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedMVPCard;