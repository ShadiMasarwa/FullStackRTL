import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { MessageCircle, Send, Trash2, Reply } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { insertCommentSchema, type Comment, type InsertComment } from '@shared/schema';
import { formatDistanceToNow } from 'date-fns';
import { he } from 'date-fns/locale';
import { z } from 'zod';

const commentFormSchema = z.object({
  content: z.string().min(3, 'ההערה קצרה מדי - כתוב לפחות 3 תווים').max(1000, 'ההערה ארוכה מדי'),
});

type CommentFormData = z.infer<typeof commentFormSchema>;

interface LessonDiscussionProps {
  lessonSlug: string;
}

export function LessonDiscussion({ lessonSlug }: LessonDiscussionProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: '',
    },
  });

  const replyForm = useForm<CommentFormData>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: '',
    },
  });

  const { data: comments = [], isLoading } = useQuery<Comment[]>({
    queryKey: ['/api/lessons', lessonSlug, 'comments'],
    enabled: !!lessonSlug,
  });

  const createMutation = useMutation({
    mutationFn: async (data: { content: string; parentCommentId?: string }) => {
      return await apiRequest('POST', `/api/lessons/${lessonSlug}/comments`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/lessons', lessonSlug, 'comments'] });
      form.reset();
      replyForm.reset();
      setReplyingTo(null);
      toast({
        title: 'ההערה נוספה בהצלחה',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'שגיאה בהוספת הערה',
        description: 'אנא נסה שוב',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (commentId: string) => {
      return await apiRequest('DELETE', `/api/comments/${commentId}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/lessons', lessonSlug, 'comments'] });
      toast({
        title: 'ההערה נמחקה בהצלחה',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'שגיאה במחיקת הערה',
        description: 'אנא נסה שוב',
      });
    },
  });

  const handleSubmit = (data: CommentFormData) => {
    createMutation.mutate({ content: data.content });
  };

  const handleReply = (parentId: string, data: CommentFormData) => {
    createMutation.mutate({ 
      content: data.content,
      parentCommentId: parentId,
    });
  };

  const handleReplyToChange = (commentId: string | null) => {
    if (replyingTo && replyingTo !== commentId) {
      replyForm.reset();
    }
    setReplyingTo(commentId);
  };

  const handleDelete = (commentId: string) => {
    if (confirm('האם אתה בטוח שברצונך למחוק את ההערה?')) {
      deleteMutation.mutate(commentId);
    }
  };

  const commentsArray = Array.isArray(comments) ? comments : [];
  const topLevelComments = commentsArray.filter(c => !c.parentCommentId);
  const getReplies = (commentId: string) => 
    commentsArray.filter(c => c.parentCommentId === commentId);

  if (isLoading) {
    return (
      <Card className="mt-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-right">
            <MessageCircle className="h-5 w-5" />
            <span>שאלות ותגובות</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-32 mr-auto" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-32 mb-2 mr-auto" />
                  <Skeleton className="h-16 w-full mb-2" />
                  <Skeleton className="h-8 w-24 mr-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-12" data-testid="card-discussion">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-right">
          <MessageCircle className="h-5 w-5" />
          <span>שאלות ותגובות</span>
          <span className="text-sm text-muted-foreground">
            ({commentsArray.length})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* New Comment Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="שתף את השאלה או ההערה שלך..."
                      rows={3}
                      className="resize-none text-right"
                      data-testid="textarea-new-comment"
                    />
                  </FormControl>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={createMutation.isPending}
                className="gap-2"
                data-testid="button-submit-comment"
              >
                <Send className="h-4 w-4" />
                פרסם הערה
              </Button>
            </div>
          </form>
        </Form>

        {/* Comments List */}
        <div className="space-y-4">
          {topLevelComments.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              אין עדיין הערות. היה הראשון לשאול שאלה!
            </p>
          ) : (
            topLevelComments.map((comment) => (
              <div key={comment._id} className="space-y-3">
                {/* Top Level Comment */}
                <Card className={comment.isMentorResponse ? 'border-primary' : ''} data-testid={`card-comment-${comment._id}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 text-right">
                        <div className="flex items-center gap-2 mb-2 justify-end">
                          <span className="text-xs text-muted-foreground" data-testid={`text-time-${comment._id}`}>
                            {formatDistanceToNow(new Date(comment.createdAt), {
                              addSuffix: true,
                              locale: he,
                            })}
                          </span>
                          <span className="font-semibold text-sm" data-testid={`text-author-${comment._id}`}>
                            {comment.userDisplayName}
                          </span>
                          {comment.isMentorResponse && (
                            <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded" data-testid={`badge-mentor-${comment._id}`}>
                              מנטור
                            </span>
                          )}
                        </div>
                        <p className="text-foreground whitespace-pre-wrap" data-testid={`text-content-${comment._id}`}>
                          {comment.content}
                        </p>
                        <div className="flex gap-2 mt-3 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleReplyToChange(replyingTo === comment._id ? null : comment._id)}
                            className="gap-1"
                            data-testid={`button-reply-${comment._id}`}
                          >
                            <Reply className="h-3 w-3" />
                            <span className="text-xs">השב</span>
                          </Button>
                          {user?.id === comment.userId && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(comment._id)}
                              className="gap-1 text-destructive hover:text-destructive"
                              data-testid={`button-delete-${comment._id}`}
                            >
                              <Trash2 className="h-3 w-3" />
                              <span className="text-xs">מחק</span>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Reply Form */}
                    {replyingTo === comment._id && (
                      <div className="mt-4 pr-4 border-r-2 border-muted space-y-2">
                        <Form {...replyForm}>
                          <form onSubmit={replyForm.handleSubmit((data) => handleReply(comment._id, data))} className="space-y-2">
                            <FormField
                              control={replyForm.control}
                              name="content"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea
                                      {...field}
                                      placeholder="כתוב תגובה..."
                                      rows={2}
                                      className="resize-none text-right"
                                      data-testid={`textarea-reply-${comment._id}`}
                                    />
                                  </FormControl>
                                  <FormMessage className="text-right" />
                                </FormItem>
                              )}
                            />
                            <div className="flex gap-2 justify-end">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleReplyToChange(null)}
                                data-testid={`button-cancel-reply-${comment._id}`}
                              >
                                ביטול
                              </Button>
                              <Button
                                type="submit"
                                size="sm"
                                disabled={createMutation.isPending}
                                className="gap-1"
                                data-testid={`button-submit-reply-${comment._id}`}
                              >
                                <Send className="h-3 w-3" />
                                שלח תגובה
                              </Button>
                            </div>
                          </form>
                        </Form>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Replies */}
                {getReplies(comment._id).map((reply) => (
                  <Card
                    key={reply._id}
                    className={`mr-8 ${reply.isMentorResponse ? 'border-primary' : ''}`}
                    data-testid={`card-reply-${reply._id}`}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-1 text-right">
                          <div className="flex items-center gap-2 mb-2 justify-end">
                            <span className="text-xs text-muted-foreground" data-testid={`text-time-${reply._id}`}>
                              {formatDistanceToNow(new Date(reply.createdAt), {
                                addSuffix: true,
                                locale: he,
                              })}
                            </span>
                            <span className="font-semibold text-sm" data-testid={`text-author-${reply._id}`}>
                              {reply.userDisplayName}
                            </span>
                            {reply.isMentorResponse && (
                              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded" data-testid={`badge-mentor-${reply._id}`}>
                                מנטור
                              </span>
                            )}
                          </div>
                          <p className="text-foreground text-sm whitespace-pre-wrap" data-testid={`text-content-${reply._id}`}>
                            {reply.content}
                          </p>
                          {user?.id === reply.userId && (
                            <div className="flex gap-2 mt-2 justify-end">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(reply._id)}
                                className="gap-1 text-destructive hover:text-destructive"
                                data-testid={`button-delete-reply-${reply._id}`}
                              >
                                <Trash2 className="h-3 w-3" />
                                <span className="text-xs">מחק</span>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
