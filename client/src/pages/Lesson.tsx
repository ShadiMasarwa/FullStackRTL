import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { LessonDiscussion } from '@/components/LessonDiscussion';
import { ArrowRight, ArrowLeft, Code2, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Lesson } from '@shared/schema';

export default function LessonPage() {
  const [, params] = useRoute('/lesson/:slug');
  const lessonSlug = params?.slug;
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const { data: lesson, isLoading } = useQuery<Lesson>({
    queryKey: ['/api/lessons', lessonSlug],
    enabled: !!lessonSlug,
  });

  // Reset to first page when lesson changes
  useEffect(() => {
    setCurrentPageIndex(0);
  }, [lessonSlug, lesson?.pages]);

  if (!lessonSlug) {
    return <div className="text-center py-12">שיעור לא נמצא</div>;
  }

  const currentPage = lesson?.pages?.[currentPageIndex];
  const totalPages = lesson?.pages?.length || 0;
  const isFirstPage = currentPageIndex === 0;
  const isLastPage = currentPageIndex === totalPages - 1;

  const handleNextPage = () => {
    if (!isLastPage) {
      setCurrentPageIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (!isFirstPage) {
      setCurrentPageIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
            <div className="flex items-center gap-3 justify-end text-muted-foreground">
              <span>שיעור {lesson?.order}</span>
              {totalPages > 1 && (
                <>
                  <span>•</span>
                  <span>עמוד {currentPageIndex + 1} מתוך {totalPages}</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Page Navigation - Top */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
            <Button
              variant="outline"
              onClick={handlePrevPage}
              disabled={isFirstPage}
              className="gap-2"
              data-testid="button-prev-page-top"
            >
              <ChevronRight className="h-4 w-4" />
              עמוד קודם
            </Button>
            <div className="flex gap-2">
              {lesson?.pages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentPageIndex(index);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentPageIndex
                      ? 'bg-primary w-8'
                      : 'bg-muted-foreground/30 hover-elevate'
                  }`}
                  data-testid={`button-page-${index}`}
                  aria-label={`עמוד ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={isLastPage}
              className="gap-2"
              data-testid="button-next-page-top"
            >
              עמוד הבא
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Page Content */}
        {isLoading ? (
          <div className="space-y-6 mb-12">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : currentPage ? (
          <div className="mb-12">
            {/* Page Title */}
            <h2 className="text-3xl font-bold text-foreground mb-8 text-right">
              {currentPage.titleHE}
            </h2>

            {/* Page Content */}
            <div className="prose prose-lg max-w-none text-right mb-12">
              <div
                className="text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: currentPage.contentHE }}
              />
            </div>

            {/* Code Examples */}
            {currentPage.codeExamples && currentPage.codeExamples.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground text-right">דוגמאות קוד</h3>
                {currentPage.codeExamples.map((example, index) => (
                  <Card key={index} className="overflow-hidden" data-testid={`card-example-${index}`}>
                    <CardContent className="p-0">
                      <div className="bg-muted/50 px-6 py-3 border-b border-border">
                        <div className="flex items-center gap-2 justify-end">
                          <h4 className="font-semibold text-foreground">{example.titleHE}</h4>
                          <Code2 className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="p-6 space-y-4">
                        {/* Code */}
                        <div>
                          <h5 className="text-sm font-medium text-muted-foreground mb-2 text-right">קוד:</h5>
                          <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
                            <code className="text-sm font-mono text-card-foreground" dir="ltr">
                              {example.code}
                            </code>
                          </pre>
                        </div>

                        {/* Output */}
                        <div>
                          <h5 className="text-sm font-medium text-muted-foreground mb-2 text-right">תוצאה:</h5>
                          <div className="bg-muted p-4 rounded-lg border border-border">
                            <pre className="text-sm text-foreground whitespace-pre-wrap" dir="ltr">
                              {example.output}
                            </pre>
                          </div>
                        </div>

                        {/* Explanation */}
                        {example.explanationHE && (
                          <div>
                            <h5 className="text-sm font-medium text-muted-foreground mb-2 text-right">הסבר:</h5>
                            <div className="text-foreground text-right leading-relaxed">
                              <div dangerouslySetInnerHTML={{ __html: example.explanationHE }} />
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : null}

        {/* Page Navigation - Bottom */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-between mb-12 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handlePrevPage}
              disabled={isFirstPage}
              className="gap-2"
              data-testid="button-prev-page-bottom"
            >
              <ChevronRight className="h-4 w-4" />
              עמוד קודם
            </Button>
            <span className="text-sm text-muted-foreground">
              עמוד {currentPageIndex + 1} מתוך {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={isLastPage}
              className="gap-2"
              data-testid="button-next-page-bottom"
            >
              עמוד הבא
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Discussion Section */}
        {!isLoading && lessonSlug && isLastPage && (
          <LessonDiscussion lessonSlug={lessonSlug} />
        )}

        {/* CTA to Quiz */}
        {!isLoading && isLastPage && (
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
