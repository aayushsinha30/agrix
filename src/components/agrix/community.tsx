'use client';
import { useState, useEffect } from 'react';
import { generateCommunityContent } from '@/ai/flows/generate-community-content';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { ThumbsUp, MessageSquare, Loader2 } from 'lucide-react';
import type { CommunityPost } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function Community() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { posts } = await generateCommunityContent();
        const formattedPosts = posts.map((post, index) => ({
          ...post,
          id: `post-${index}-${Date.now()}`,
          avatar: `https://picsum.photos/seed/${post.author
            .split(' ')
            .join('')}/100/100`,
        }));
        setPosts(formattedPosts);
      } catch (error) {
        console.error('Failed to fetch community posts:', error);
        toast({
          title: 'Error',
          description: 'Could not load community posts. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4">Loading community feed...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarImage
                src="https://picsum.photos/seed/farmer/100/100"
                alt="Your avatar"
              />
              <AvatarFallback>YOU</AvatarFallback>
            </Avatar>
            <div className="w-full space-y-2">
              <Textarea placeholder="Share your thoughts or ask a question..." />
              <div className="flex justify-end">
                <Button>Post</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={post.avatar} alt={post.author} />
                  <AvatarFallback>
                    {post.author.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{post.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {post.time}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-foreground/90">
                    {post.content}
                  </p>
                  <div className="mt-4 flex items-center gap-6 text-muted-foreground">
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4" /> {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" /> {post.comments}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
