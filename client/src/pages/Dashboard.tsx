import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ProgressBar';
import { ProgressCircle } from '@/components/ProgressCircle';
import { Skeleton } from '@/components/ui/skeleton';
import { Code, Palette, Layout, FileCode, Layers, Server, Database, ArrowLeft } from 'lucide-react';
import type { CourseWithProgress, ProgressOverview } from '@shared/schema';

const courseIcons: Record<string, any> = {
  html: Code,
  css: Palette,
  bootstrap: Layout,
  javascript: FileCode,
  react: Layers,
  nodejs: Server,
  mongodb: Database,
};

const courseColors: Record<string, string> = {
  html: 'text-orange-500',
  css: 'text-blue-500',
  bootstrap: 'text-purple-500',
  javascript: 'text-yellow-500',
  react: 'text-cyan-500',
  nodejs: 'text-green-500',
  mongodb: 'text-emerald-500',
};

export default function Dashboard() {
  const { data: overview, isLoading: overviewLoading } = useQuery<ProgressOverview>({
    queryKey: ['/api/progress/overview'],
  });

  const { data: courses, isLoading: coursesLoading } = useQuery<CourseWithProgress[]>({
    queryKey: ['/api/courses'],
  });

  const isLoading = overviewLoading || coursesLoading;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 text-right">
          <h1 className="text-4xl font-bold text-foreground mb-2">לוח הבקרה</h1>
          <p className="text-xl text-muted-foreground">המשך מאיפה שעצרת והשלם את המסלול</p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-12 shadow-lg">
          <CardHeader className="text-right">
            <CardTitle className="text-2xl">התקדמות כוללת</CardTitle>
            <CardDescription>ההתקדמות שלך בכל הקורסים</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex flex-col md:flex-row items-center gap-8">
                <Skeleton className="h-40 w-40 rounded-full" />
                <div className="flex-1 w-full space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center gap-8">
                <ProgressCircle percentage={overview?.overallPercentage || 0} size={160} strokeWidth={12} />
                <div className="flex-1 w-full text-right">
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {overview?.completedLessons || 0} מתוך {overview?.totalLessons || 56} שיעורים
                  </div>
                  <p className="text-lg text-muted-foreground">
                    המשך ללמוד והשלם את כל השיעורים כדי לסיים את המסלול
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Courses Grid */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-6 text-right">הקורסים שלי</h2>
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(7)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-16 w-16 rounded-2xl mb-4" />
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-3 w-full mb-2" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses?.map((course) => {
                const Icon = courseIcons[course.slug] || Code;
                const colorClass = courseColors[course.slug] || 'text-primary';

                return (
                  <Card
                    key={course._id}
                    className="hover-elevate transition-all"
                    data-testid={`card-course-${course.slug}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-card-foreground/5">
                          <Icon className={`h-8 w-8 ${colorClass}`} />
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-foreground mb-2 text-right">
                        {course.titleHE}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 text-right line-clamp-2">
                        {course.descriptionHE}
                      </p>

                      <ProgressBar
                        percentage={course.progressPercentage}
                        height="sm"
                        className="mb-4"
                      />

                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <span>{course.levelRange}</span>
                        <span>
                          {course.completedLessons}/{course.totalLessons} שיעורים
                        </span>
                      </div>

                      <Link href={`/course/${course.slug}`}>
                        <Button className="w-full gap-2" data-testid={`button-enter-course-${course.slug}`}>
                          <ArrowLeft className="h-4 w-4" />
                          כניסה לקורס
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
