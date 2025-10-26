import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Award } from 'lucide-react';
import type { LearningHistoryItem } from '@shared/schema';

export default function History() {
  const { data: history, isLoading } = useQuery<LearningHistoryItem[]>({
    queryKey: ['/api/progress/history'],
  });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 text-right">
          <h1 className="text-4xl font-bold text-foreground mb-2">היסטוריית למידה</h1>
          <p className="text-xl text-muted-foreground">כל השיעורים שהשלמת עד כה</p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : history && history.length > 0 ? (
          <>
            {/* Summary */}
            <Card className="mb-8 shadow-lg">
              <CardHeader className="text-right">
                <CardTitle className="text-2xl">סיכום</CardTitle>
                <CardDescription>ההישגים שלך</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-foreground">{history.length}</div>
                      <div className="text-sm text-muted-foreground">שיעורים הושלמו</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* History Table */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground text-right mb-6">שיעורים שהושלמו</h2>
              
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-right p-4 font-semibold text-foreground">ציון</th>
                      <th className="text-right p-4 font-semibold text-foreground">תאריך</th>
                      <th className="text-right p-4 font-semibold text-foreground">שיעור</th>
                      <th className="text-right p-4 font-semibold text-foreground">קורס</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-border hover-elevate transition-colors"
                        data-testid={`row-history-${index}`}
                      >
                        <td className="p-4">
                          <Badge className="bg-green-500/10 text-green-700 dark:text-green-400">
                            {item.score}%
                          </Badge>
                        </td>
                        <td className="p-4 text-muted-foreground">
                          <div className="flex items-center gap-2 justify-end">
                            <span>{formatDate(item.completedAt)}</span>
                            <Calendar className="h-4 w-4" />
                          </div>
                        </td>
                        <td className="p-4">
                          <Link href={`/lesson/${item.lessonSlug}`}>
                            <Button variant="link" className="h-auto p-0 text-base" data-testid={`link-lesson-${item.lessonSlug}`}>
                              {item.lessonTitleHE}
                            </Button>
                          </Link>
                        </td>
                        <td className="p-4 font-medium text-foreground text-right">
                          <Link href={`/course/${item.courseSlug}`}>
                            <Button variant="link" className="h-auto p-0 text-base font-semibold" data-testid={`link-course-${item.courseSlug}`}>
                              {item.courseTitleHE}
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {history.map((item, index) => (
                  <Card key={index} className="hover-elevate transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <Badge className="bg-green-500/10 text-green-700 dark:text-green-400">
                          {item.score}%
                        </Badge>
                        <div className="text-right">
                          <Link href={`/course/${item.courseSlug}`}>
                            <Button variant="link" className="h-auto p-0 text-sm font-semibold">
                              {item.courseTitleHE}
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <Link href={`/lesson/${item.lessonSlug}`}>
                        <h3 className="text-lg font-semibold text-foreground mb-2 text-right hover:text-primary transition-colors">
                          {item.lessonTitleHE}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground justify-end">
                        <span>{formatDate(item.completedAt)}</span>
                        <Calendar className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        ) : (
          <Card className="shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
                <Award className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">עדיין לא השלמת שיעורים</h3>
              <p className="text-lg text-muted-foreground mb-6">
                התחל ללמוד עכשיו כדי לראות את ההתקדמות שלך כאן
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  <ArrowLeft className="h-5 w-5" />
                  עבור ללוח הבקרה
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
