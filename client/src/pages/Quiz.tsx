import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRoute, useLocation, Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { CheckCircle, XCircle, ArrowRight, ArrowLeft, RotateCcw, SkipForward } from 'lucide-react';
import type { ClientQuiz, QuizResult, Lesson, LessonProgressStatus, LessonWithStatus } from '@shared/schema';

// Shuffle array using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Quiz() {
  const [, params] = useRoute('/quiz/:lessonSlug');
  const [, setLocation] = useLocation();
  const lessonSlug = params?.lessonSlug;
  const { toast } = useToast();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  // Store shuffled order for each question: maps display index -> original index
  const [shuffledOrders, setShuffledOrders] = useState<number[][]>([]);

  const { data: lesson } = useQuery<Lesson>({
    queryKey: [`/api/lessons/${lessonSlug}`],
    enabled: !!lessonSlug,
  });

  const { data: progressStatus } = useQuery<LessonProgressStatus>({
    queryKey: [`/api/lessons/${lessonSlug}/progress`],
    enabled: !!lessonSlug,
  });

  const { data: courseLessons } = useQuery<LessonWithStatus[]>({
    queryKey: [`/api/courses/${lesson?.courseSlug}/lessons`],
    enabled: !!lesson?.courseSlug,
  });

  const { data: quiz, isLoading } = useQuery<ClientQuiz>({
    queryKey: [`/api/lessons/${lessonSlug}/quiz`],
    enabled: !!lessonSlug,
  });

  // Initialize selectedAnswers and shuffle answer order when quiz loads
  useEffect(() => {
    if (quiz && quiz.questions && quiz.questions.length > 0 && selectedAnswers.length === 0) {
      setSelectedAnswers(Array(quiz.questions.length).fill(null));
      
      // Create shuffled orders for all questions
      const orders = quiz.questions.map(q => {
        const indices = Array.from({ length: q.choicesHE.length }, (_, i) => i);
        return shuffleArray(indices);
      });
      setShuffledOrders(orders);
    }
  }, [quiz]);

  const submitMutation = useMutation({
    mutationFn: async (answers: number[]) => {
      const result = await apiRequest('POST', `/api/lessons/${lessonSlug}/quiz/submit`, { answers });
      return result as QuizResult;
    },
    onSuccess: (result) => {
      setQuizResult(result);
      queryClient.invalidateQueries({ queryKey: ['/api/progress/overview'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/history'] });
      queryClient.invalidateQueries({ queryKey: ['/api/courses'] });
      
      if (result.passed) {
        toast({
          title: 'כל הכבוד! 🎉',
          description: 'עברת את השאלון בהצלחה והשיעור הבא נפתח',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'יש תשובות שגויות',
          description: 'בדוק את התשובות ונסה שוב',
        });
      }
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'שגיאה בשליחת השאלון',
        description: 'אנא נסה שוב',
      });
    },
  });

  if (!lessonSlug || isLoading || !quiz || !quiz.questions || quiz.questions.length === 0) {
    return <div className="text-center py-12">טוען שאלון...</div>;
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const allAnswered = quiz.questions.every((_, idx) => Number.isInteger(selectedAnswers[idx]) && selectedAnswers[idx] !== null);
    
    if (!allAnswered) {
      toast({
        variant: 'destructive',
        title: 'שגיאה',
        description: 'עליך לענות על כל השאלות',
      });
      return;
    }
    submitMutation.mutate(selectedAnswers as number[]);
  };

  const handleRetry = () => {
    setQuizResult(null);
    setSelectedAnswers(Array(quiz.questions.length).fill(null));
    setCurrentQuestion(0);
    
    // Re-shuffle answers on retry
    if (quiz && quiz.questions) {
      const orders = quiz.questions.map(q => {
        const indices = Array.from({ length: q.choicesHE.length }, (_, i) => i);
        return shuffleArray(indices);
      });
      setShuffledOrders(orders);
    }
  };

  const goToNextLesson = () => {
    if (!lesson || !courseLessons) {
      return;
    }

    // Find current lesson index
    const currentIndex = courseLessons.findIndex(l => l.slug === lesson.slug);
    
    // Check if there's a next lesson
    if (currentIndex >= 0 && currentIndex < courseLessons.length - 1) {
      const nextLesson = courseLessons[currentIndex + 1];
      setLocation(`/lesson/${nextLesson.slug}`);
    } else {
      // No next lesson, go back to course page
      setLocation(`/course/${lesson.courseSlug}`);
    }
  };

  // Results View
  if (quizResult) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="mb-8 shadow-lg">
            <CardHeader className="text-center">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 mx-auto ${
                quizResult.passed ? 'bg-green-500/10' : 'bg-red-500/10'
              }`}>
                {quizResult.passed ? (
                  <CheckCircle className="h-10 w-10 text-green-500" />
                ) : (
                  <XCircle className="h-10 w-10 text-red-500" />
                )}
              </div>
              <CardTitle className="text-3xl">
                {quizResult.passed ? 'כל הכבוד!' : 'נסה שוב'}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-5xl font-bold text-foreground mb-4">
                {quizResult.correctCount}/{quiz.questions.length}
              </div>
              <p className="text-xl text-muted-foreground mb-6">
                {quizResult.passed
                  ? 'ענית נכון על כל השאלות! השיעור הבא נפתח עכשיו'
                  : 'יש תשובות שגויות. בדוק את הפתרון ונסה שוב'}
              </p>
            </CardContent>
          </Card>

          {/* Question by Question Review */}
          <div className="space-y-4 mb-8">
            {quiz.questions.map((question, index) => {
              const result = quizResult.results[index];
              const isCorrect = result.isCorrect;
              
              // Get shuffled order for this question
              const questionShuffledOrder = shuffledOrders[index] || [];
              const questionShuffledChoices = questionShuffledOrder.map(originalIndex => 
                question.choicesHE[originalIndex]
              );

              return (
                <Card key={index} className={`border-2 ${isCorrect ? 'border-green-500/30' : 'border-red-500/30'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {isCorrect ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-500" />
                        )}
                      </div>
                      <div className="flex-1 text-right">
                        <h3 className="font-semibold text-foreground mb-3">
                          שאלה {index + 1}: {question.promptHE}
                        </h3>
                        <div className="space-y-2">
                          {questionShuffledChoices.map((choice, displayIndex) => {
                            const originalIndex = questionShuffledOrder[displayIndex];
                            const isChosen = result.chosenIndex === originalIndex;
                            const isCorrectAnswer = result.correctIndex === originalIndex;

                            return (
                              <div
                                key={displayIndex}
                                className={`p-3 rounded-lg border-2 ${
                                  isCorrectAnswer
                                    ? 'border-green-500 bg-green-500/5'
                                    : isChosen && !isCorrect
                                    ? 'border-red-500 bg-red-500/5'
                                    : 'border-border bg-card'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    {isCorrectAnswer && (
                                      <Badge className="bg-green-500/10 text-green-700 dark:text-green-400">נכון</Badge>
                                    )}
                                    {isChosen && !isCorrect && (
                                      <Badge className="bg-red-500/10 text-red-700 dark:text-red-400">הבחירה שלך</Badge>
                                    )}
                                  </div>
                                  <span className="text-foreground">{choice}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            {quizResult.passed ? (
              <Button size="lg" onClick={goToNextLesson} className="gap-2" data-testid="button-next-lesson">
                <ArrowLeft className="h-5 w-5" />
                המשך לשיעור הבא
              </Button>
            ) : (
              <>
                <Button size="lg" onClick={handleRetry} className="gap-2" data-testid="button-retry">
                  <RotateCcw className="h-5 w-5" />
                  נסה שוב
                </Button>
                <Link href={`/lesson/${lessonSlug}`}>
                  <Button variant="outline" size="lg" className="gap-2" data-testid="button-back-to-lesson">
                    <ArrowRight className="h-5 w-5" />
                    חזרה לשיעור
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Quiz View - All guards passed, quiz and questions are guaranteed to exist
  const question = quiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;
  
  // Get shuffled choices for current question
  const currentShuffledOrder = shuffledOrders[currentQuestion] || [];
  const shuffledChoices = currentShuffledOrder.map(originalIndex => 
    question.choicesHE[originalIndex]
  );
  
  // Helper to check if a question is answered with a valid numeric answer
  const isAnswered = (idx: number) => {
    const answer = selectedAnswers[idx];
    const choiceCount = quiz.questions[idx].choicesHE.length;
    return typeof answer === 'number' && Number.isInteger(answer) && answer >= 0 && answer < choiceCount;
  };
  
  // Check if all questions are answered
  const allAnswered = quiz.questions.every((_, idx) => isAnswered(idx));

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Skip Option for Passed Quizzes */}
        {progressStatus?.hasPassed && (
          <Card className="mb-6 border-green-500/30 bg-green-500/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <div className="text-right">
                    <p className="font-semibold text-foreground">כבר עברת את השאלון הזה</p>
                    <p className="text-sm text-muted-foreground">ציון קודם: {progressStatus.score}/100</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={goToNextLesson}
                  className="gap-2"
                  data-testid="button-skip-quiz"
                >
                  <SkipForward className="h-5 w-5" />
                  דלג לשיעור הבא
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>שאלה {currentQuestion + 1} מתוך {quiz.questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}% הושלם</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-right">{question.promptHE}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswers[currentQuestion]?.toString()}
              onValueChange={(value) => {
                const parsed = parseInt(value, 10);
                if (!isNaN(parsed)) {
                  handleAnswerSelect(parsed);
                }
              }}
            >
              <div className="space-y-3">
                {shuffledChoices.map((choice, displayIndex) => {
                  const originalIndex = currentShuffledOrder[displayIndex];
                  return (
                    <div
                      key={displayIndex}
                      className={`flex items-center p-4 rounded-lg border-2 transition-all cursor-pointer hover-elevate ${
                        selectedAnswers[currentQuestion] === originalIndex
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-card'
                      }`}
                      onClick={() => handleAnswerSelect(originalIndex)}
                    >
                      <RadioGroupItem value={originalIndex.toString()} id={`choice-${displayIndex}`} className="ml-3" />
                      <Label
                        htmlFor={`choice-${displayIndex}`}
                        className="flex-1 text-right cursor-pointer text-base"
                      >
                        {choice}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="gap-2"
            data-testid="button-previous"
          >
            <ArrowRight className="h-4 w-4" />
            הקודם
          </Button>

          <div className="flex gap-2">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentQuestion
                    ? 'bg-primary w-6'
                    : isAnswered(index)
                    ? 'bg-primary/50'
                    : 'bg-muted'
                }`}
                aria-label={`שאלה ${index + 1}`}
              />
            ))}
          </div>

          {isLastQuestion ? (
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered || submitMutation.isPending}
              className="gap-2"
              data-testid="button-submit-quiz"
            >
              {submitMutation.isPending ? 'שולח...' : 'שלח'}
              <ArrowLeft className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!isAnswered(currentQuestion)}
              className="gap-2"
              data-testid="button-next"
            >
              הבא
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
