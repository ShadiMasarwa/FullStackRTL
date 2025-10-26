import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Palette, Layout, FileCode, Layers, Server, Database, CheckCircle, Lock, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const courses = [
  { icon: Code, title: 'HTML', color: 'text-orange-500', lessons: 8 },
  { icon: Palette, title: 'CSS', color: 'text-blue-500', lessons: 8 },
  { icon: Layout, title: 'Bootstrap', color: 'text-purple-500', lessons: 8 },
  { icon: FileCode, title: 'JavaScript', color: 'text-yellow-500', lessons: 8 },
  { icon: Layers, title: 'React', color: 'text-cyan-500', lessons: 8 },
  { icon: Server, title: 'Node.js', color: 'text-green-500', lessons: 8 },
  { icon: Database, title: 'MongoDB', color: 'text-emerald-500', lessons: 8 },
];

const features = [
  {
    icon: CheckCircle,
    title: 'למידה מובנית ומסודרת',
    description: '7 קורסים מקיפים עם 56 שיעורים המובילים אותך מהיסודות ועד לבניית אפליקציות מלאות',
  },
  {
    icon: Lock,
    title: 'מערכת התקדמות חכמה',
    description: 'כל שיעור נפתח רק לאחר עמידה בהצלחה בשאלון השיעור הקודם - כך תלמד בקצב נכון',
  },
  {
    icon: TrendingUp,
    title: 'מעקב התקדמות אישי',
    description: 'עקוב אחר ההתקדמות שלך בכל קורס וקורס, צפה בהישגים וזהה נקודות לשיפור',
  },
];

export default function Landing() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-right space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                לומדים פולסטאק
                <br />
                <span className="text-primary">בעברית</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                מסלול לימוד מקיף ומעשי ללימוד פיתוח Full-Stack מאפס ועד מקצוען
              </p>
              <div className="flex gap-4 justify-end">
                {isAuthenticated ? (
                  <Link href="/dashboard">
                    <Button size="lg" className="text-lg px-8" data-testid="button-dashboard">
                      כניסה ללוח הבקרה
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/register">
                      <Button size="lg" className="text-lg px-8" data-testid="button-hero-register">
                        התחל ללמוד עכשיו
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button variant="outline" size="lg" className="text-lg px-8" data-testid="button-hero-login">
                        יש לי חשבון
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
                <Card className="relative shadow-2xl">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-3 gap-4">
                      {courses.map((course, i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card hover-elevate active-elevate-2 transition-transform"
                        >
                          <course.icon className={`h-8 w-8 ${course.color}`} />
                          <span className="text-xs font-medium text-center">{course.title}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">למה FullStackEDU?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              מערכת לימוד מתקדמת שמביאה אותך ממתחיל לפולסטאק דבלופר
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover-elevate transition-all">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Overview */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">7 קורסים מקיפים</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              מ-HTML בסיסי ועד MongoDB מתקדם - כל מה שצריך לפולסטאק
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <Card key={index} className="hover-elevate transition-all" data-testid={`card-course-${course.title.toLowerCase()}`}>
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-card-foreground/5 mb-4">
                    <course.icon className={`h-10 w-10 ${course.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-foreground">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">רמה: מתחיל–בינוני+</p>
                  <div className="text-sm font-medium text-muted-foreground">
                    {course.lessons} שיעורים
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            מוכנים להתחיל את המסע?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            הצטרפו עכשיו ל-FullStackEDU והתחילו ללמוד פיתוח Full-Stack בעברית
          </p>
          {!isAuthenticated && (
            <Link href="/register">
              <Button size="lg" className="text-lg px-12 py-6 h-auto" data-testid="button-cta-register">
                הירשם בחינם
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
