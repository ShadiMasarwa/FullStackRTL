import { useQuery } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { LessonDiscussion } from '@/components/LessonDiscussion';
import { ArrowRight, ArrowLeft, Code2 } from 'lucide-react';
import type { Lesson } from '@shared/schema';

export default function LessonPage() {
  const [, params] = useRoute('/lesson/:slug');
  const lessonSlug = params?.slug;

  const { data: lesson, isLoading } = useQuery<Lesson>({
    queryKey: ['/api/lessons', lessonSlug],
    enabled: !!lessonSlug,
  });

  if (!lessonSlug) {
    return <div className="text-center py-12">שיעור לא נמצא</div>;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        {!isLoading && lesson && (
          <div className="mb-8">
            <Link href={`/course/${lesson.courseSlug}`}>
              <Button variant="ghost" className="gap-2 -mr-4" data-testid="button-back-course">
                <ArrowRight className="h-4 w-4" />
                חזרה לקורס
              </Button>
            </Link>
          </div>
        )}

        {/* Lesson Header */}
        {isLoading ? (
          <div className="mb-12">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/4" />
          </div>
        ) : (
          <div className="mb-12 text-right">
            <h1 className="text-4xl font-bold text-foreground mb-2">{lesson?.titleHE}</h1>
            <p className="text-muted-foreground">שיעור {lesson?.order}</p>
          </div>
        )}

        {/* Lesson Content */}
        {isLoading ? (
          <div className="space-y-6 mb-12">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : (
          <div className="prose prose-lg max-w-none text-right mb-12">
            <div
              className="text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: lesson?.contentHE || '' }}
            />
          </div>
        )}

        {/* Examples */}
        {!isLoading && lesson?.examples && lesson.examples.length > 0 && (
          <div className="space-y-6 mb-12">
            <h2 className="text-2xl font-bold text-foreground text-right">דוגמאות</h2>
            {lesson.examples.map((example, index) => (
              <Card key={index} className="overflow-hidden" data-testid={`card-example-${index}`}>
                <CardContent className="p-0">
                  <div className="bg-muted/50 px-6 py-3 border-b border-border">
                    <div className="flex items-center gap-2 justify-end">
                      <h3 className="font-semibold text-foreground">{example.titleHE}</h3>
                      <Code2 className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2 text-right">קוד:</h4>
                      <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
                        <code className="text-sm font-mono text-card-foreground" dir="ltr">
                          {example.code}
                        </code>
                      </pre>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2 text-right">תוצאה צפויה:</h4>
                      <div className="bg-muted p-4 rounded-lg border border-border">
                        <pre className="text-sm text-foreground whitespace-pre-wrap" dir="ltr">
                          {example.expectedOutput}
                        </pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Discussion Section */}
        {!isLoading && lessonSlug && (
          <LessonDiscussion lessonSlug={lessonSlug} />
        )}

        {/* CTA to Quiz */}
        {!isLoading && (
          <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t border-border py-6 -mx-4 px-4 mt-8">
            <div className="max-w-4xl mx-auto">
              <Link href={`/quiz/${lessonSlug}`}>
                <Button size="lg" className="w-full sm:w-auto sm:min-w-[300px] gap-2 text-lg" data-testid="button-go-to-quiz">
                  <ArrowLeft className="h-5 w-5" />
                  המשך לשאלון
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
