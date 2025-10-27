import { useQuery, useMutation } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Lock, CheckCircle, Circle, ArrowRight, ArrowLeft, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import type { LessonWithStatus, CourseWithProgress, Certificate } from '@shared/schema';

export default function Course() {
  const [, params] = useRoute('/course/:slug');
  const courseSlug = params?.slug;
  const { toast } = useToast();

  const { data: course, isLoading: courseLoading } = useQuery<CourseWithProgress>({
    queryKey: [`/api/courses/${courseSlug}`],
    enabled: !!courseSlug,
  });

  const { data: lessons, isLoading: lessonsLoading } = useQuery<LessonWithStatus[]>({
    queryKey: [`/api/courses/${courseSlug}/lessons`],
    enabled: !!courseSlug,
  });

  const { data: certificates } = useQuery<Certificate[]>({
    queryKey: ['/api/certificates'],
  });

  const isLoading = courseLoading || lessonsLoading;
  
  const hasCertificate = certificates?.some(cert => cert.courseSlug === courseSlug);
  const isCourseCompleted = course && course.completedLessons === course.totalLessons;

  const createCertificateMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest('POST', `/api/certificates/${courseSlug}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/certificates'] });
      toast({
        title: 'מזל טוב! 🎉',
        description: 'קיבלת תעודה על סיום הקורס. אתה יכול למצוא אותה בדף התעודות.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'שגיאה',
        description: error.message || 'לא ניתן ליצור תעודה כרגע',
        variant: 'destructive',
      });
    },
  });

  if (!courseSlug) {
    return <div className="text-center py-12">קורס לא נמצא</div>;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Circle className="h-5 w-5 text-blue-500" />;
      case 'locked':
        return <Lock className="h-5 w-5 text-muted-foreground" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'done':
        return <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20">הושלם</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-500/10 text-blue-700 dark:text-blue-400 hover:bg-blue-500/20">בתהליך</Badge>;
      case 'locked':
        return <Badge variant="secondary">נעול</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="gap-2 -mr-4" data-testid="button-back-dashboard">
              <ArrowRight className="h-4 w-4" />
              חזרה ללוח הבקרה
            </Button>
          </Link>
        </div>

        {/* Course Header */}
        {isLoading ? (
          <div className="mb-12">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        ) : (
          <div className="mb-12 text-right">
            <h1 className="text-4xl font-bold text-foreground mb-4">{course?.titleHE}</h1>
            <p className="text-xl text-muted-foreground mb-4">{course?.descriptionHE}</p>
            <div className="flex items-center gap-4 justify-end flex-wrap">
              <Badge variant="secondary" className="text-sm">{course?.levelRange}</Badge>
              <span className="text-sm text-muted-foreground">
                {course?.completedLessons} מתוך {course?.totalLessons} שיעורים הושלמו
              </span>
            </div>
            {isCourseCompleted && !hasCertificate && (
              <div className="mt-6">
                <Button
                  onClick={() => createCertificateMutation.mutate()}
                  disabled={createCertificateMutation.isPending}
                  className="gap-2"
                  data-testid="button-get-certificate"
                >
                  <Award className="h-5 w-5" />
                  קבל תעודת הצטיינות
                </Button>
              </div>
            )}
            {hasCertificate && (
              <div className="mt-6">
                <Link href="/certificates">
                  <Button variant="outline" className="gap-2" data-testid="button-view-certificates">
                    <Award className="h-5 w-5" />
                    צפה בתעודות שלך
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Lessons List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-right">שיעורי הקורס</h2>
          
          {isLoading ? (
            <>
              {[...Array(8)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-full" />
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <>
              {lessons?.map((lesson) => {
                const isLocked = lesson.status === 'locked';
                
                return (
                  <Card
                    key={lesson._id}
                    className={`transition-all ${!isLocked ? 'hover-elevate' : 'opacity-60'}`}
                    data-testid={`card-lesson-${lesson.slug}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">{getStatusIcon(lesson.status)}</div>
                        
                        <div className="flex-1 min-w-0 text-right">
                          <div className="flex items-center gap-3 mb-1 justify-end">
                            <h3 className="text-lg font-semibold text-foreground">
                              {lesson.titleHE}
                            </h3>
                            <span className="text-sm text-muted-foreground font-medium">
                              שיעור {lesson.order}
                            </span>
                          </div>
                          {getStatusBadge(lesson.status)}
                        </div>

                        <div className="flex-shrink-0">
                          {!isLocked ? (
                            <Link href={`/lesson/${lesson.slug}`}>
                              <Button className="gap-2" data-testid={`button-start-lesson-${lesson.slug}`}>
                                <ArrowLeft className="h-4 w-4" />
                                {lesson.status === 'done' ? 'חזרה לשיעור' : 'התחל שיעור'}
                              </Button>
                            </Link>
                          ) : (
                            <Button disabled className="gap-2">
                              <Lock className="h-4 w-4" />
                              נעול
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
