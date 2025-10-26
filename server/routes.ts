import type { Express } from "express";
import { createServer, type Server } from "http";
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import User from './models/User';
import Course from './models/Course';
import Lesson from './models/Lesson';
import Quiz from './models/Quiz';
import Progress from './models/Progress';
import { Comment } from './models/Comment';
import { authMiddleware, generateToken, type AuthRequest } from './middleware/auth';
import { connectDB } from './db';

// Connect to MongoDB
connectDB().catch(console.error);

// Validation schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  displayName: z.string().min(2),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // ============================================
  // Auth Routes
  // ============================================
  
  app.post('/api/auth/register', async (req, res) => {
    try {
      const validatedData = registerSchema.parse(req.body);
      
      const existingUser = await User.findOne({ email: validatedData.email });
      if (existingUser) {
        return res.status(400).json({ message: 'המשתמש כבר קיים' });
      }

      const passwordHash = await bcrypt.hash(validatedData.password, 10);
      
      const user = await User.create({
        email: validatedData.email,
        passwordHash,
        displayName: validatedData.displayName,
      });

      const token = generateToken(user._id.toString());

      return res.json({
        user: {
          id: user._id.toString(),
          email: user.email,
          displayName: user.displayName,
        },
        token,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'נתונים לא תקינים' });
      }
      console.error('Register error:', error);
      return res.status(500).json({ message: 'שגיאת שרת' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      
      const user = await User.findOne({ email: validatedData.email });
      if (!user) {
        return res.status(401).json({ message: 'אימייל או סיסמה שגויים' });
      }

      const isValidPassword = await bcrypt.compare(validatedData.password, user.passwordHash);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'אימייל או סיסמה שגויים' });
      }

      const token = generateToken(user._id.toString());

      return res.json({
        user: {
          id: user._id.toString(),
          email: user.email,
          displayName: user.displayName,
        },
        token,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'נתונים לא תקינים' });
      }
      console.error('Login error:', error);
      return res.status(500).json({ message: 'שגיאת שרת' });
    }
  });

  // ============================================
  // Courses Routes
  // ============================================
  
  app.get('/api/courses', authMiddleware, async (req: AuthRequest, res) => {
    try {
      const userId = req.userId!;
      const courses = await Course.find().sort({ order: 1 });
      
      const coursesWithProgress = await Promise.all(
        courses.map(async (course) => {
          const lessons = await Lesson.find({ courseSlug: course.slug });
          const totalLessons = lessons.length;
          
          const progresses = await Progress.find({
            userId,
            courseSlug: course.slug,
            status: 'done',
          });
          
          const completedLessons = progresses.length;
          const progressPercentage = totalLessons > 0 
            ? Math.round((completedLessons / totalLessons) * 100)
            : 0;

          return {
            _id: course._id.toString(),
            slug: course.slug,
            titleHE: course.titleHE,
            descriptionHE: course.descriptionHE,
            order: course.order,
            topics: course.topics,
            levelRange: course.levelRange,
            coverIcon: course.coverIcon,
            completedLessons,
            totalLessons,
            progressPercentage,
          };
        })
      );

      return res.json(coursesWithProgress);
    } catch (error) {
      console.error('Get courses error:', error);
      return res.status(500).json({ message: 'שגיאת שרת' });
    }
  });

  app.get('/api/courses/:slug', authMiddleware, async (req: AuthRequest, res) => {
    try {
      const { slug } = req.params;
      const userId = req.userId!;
      
      const course = await Course.findOne({ slug });
      if (!course) {
        return res.status(404).json({ message: 'הקורס לא נמצא' });
      }

      const lessons = await Lesson.find({ courseSlug: slug });
      const totalLessons = lessons.length;
      
      const progresses = await Progress.find({
        userId,
        courseSlug: slug,
        status: 'done',
      });
      
      const completedLessons = progresses.length;
      const progressPercentage = totalLessons > 0 
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

      return res.json({
        _id: course._id.toString(),
        slug: course.slug,
        titleHE: course.titleHE,
        descriptionHE: course.descriptionHE,
        order: course.order,
        topics: course.topics,
        levelRange: course.levelRange,
        coverIcon: course.coverIcon,
        completedLessons,
        totalLessons,
        progressPercentage,
      });
    } catch (error) {
      console.error('Get course error:', error);
      return res.status(500).json({ message: 'שגיאת שרת' });
    }
  });

  app.get('/api/courses/:slug/lessons', authMiddleware, async (req: AuthRequest, res) => {
    try {
      const { slug } = req.params;
      const userId = req.userId!;
      
      const lessons = await Lesson.find({ courseSlug: slug }).sort({ order: 1 });
      
      const lessonsWithStatus = await Promise.all(
        lessons.map(async (lesson, index) => {
          let progress = await Progress.findOne({
            userId,
            courseSlug: slug,
            lessonSlug: lesson.slug,
          });

          let status = progress?.status || 'locked';
          
          if (index === 0 && !progress) {
            progress = await Progress.create({
              userId,
              courseSlug: slug,
              lessonSlug: lesson.slug,
              status: 'in-progress',
              score: 0,
              answers: [],
            });
            status = 'in-progress';
          }

          if (index > 0) {
            const previousLesson = lessons[index - 1];
            const previousProgress = await Progress.findOne({
              userId,
              courseSlug: slug,
              lessonSlug: previousLesson.slug,
            });

            if (previousProgress?.status !== 'done') {
              status = 'locked';
            }
          }

          return {
            _id: lesson._id.toString(),
            courseSlug: lesson.courseSlug,
            slug: lesson.slug,
            titleHE: lesson.titleHE,
            order: lesson.order,
            contentHE: lesson.contentHE,
            examples: lesson.examples,
            requiresScore: lesson.requiresScore,
            status,
          };
        })
      );

      return res.json(lessonsWithStatus);
    } catch (error) {
      console.error('Get course lessons error:', error);
      return res.status(500).json({ message: 'שגיאת שרת' });
    }
  });

  // ============================================
  // Lessons Routes
  // ============================================
  
  app.get('/api/lessons/:slug', authMiddleware, async (req: AuthRequest, res) => {
    try {
      const { slug } = req.params;
      const userId = req.userId!;
      
      const lesson = await Lesson.findOne({ slug });
      if (!lesson) {
        return res.status(404).json({ message: 'השיעור לא נמצא' });
      }

      let progress = await Progress.findOne({
        userId,
        courseSlug: lesson.courseSlug,
        lessonSlug: lesson.slug,
      });

      if (!progress) {
        progress = await Progress.create({
          userId,
          courseSlug: lesson.courseSlug,
          lessonSlug: lesson.slug,
          status: 'in-progress',
          score: 0,
          answers: [],
        });
      } else if (progress.status === 'locked') {
        return res.status(403).json({ message: 'השיעור נעול' });
      }

      return res.json({
        _id: lesson._id.toString(),
        courseSlug: lesson.courseSlug,
        slug: lesson.slug,
        titleHE: lesson.titleHE,
        order: lesson.order,
        contentHE: lesson.contentHE,
        examples: lesson.examples,
        requiresScore: lesson.requiresScore,
      });
    } catch (error) {
      console.error('Get lesson error:', error);
      return res.status(500).json({ message: 'שגיאת שרת' });
    }
  });

  app.get('/api/lessons/:slug/quiz', authMiddleware, async (req: AuthRequest, res) => {
    try {
      const { slug } = req.params;
      const userId = req.userId!;
      
      const lesson = await Lesson.findOne({ slug });
      if (!lesson) {
        return res.status(404).json({ message: 'השיעור לא נמצא' });
      }

      const progress = await Progress.findOne({
        userId,
        courseSlug: lesson.courseSlug,
        lessonSlug: lesson.slug,
      });

      if (progress?.status === 'locked') {
        return res.status(403).json({ message: 'השיעור נעול' });
      }

      const quiz = await Quiz.findOne({ lessonId: lesson._id });
      if (!quiz) {
        return res.status(404).json({ message: 'השאלון לא נמצא' });
      }

      const clientQuiz = {
        lessonId: quiz.lessonId.toString(),
        questions: quiz.questions.map(q => ({
          promptHE: q.promptHE,
          choicesHE: q.choicesHE,
        })),
      };

      return res.json(clientQuiz);
    } catch (error) {
      console.error('Get quiz error:', error);
      return res.status(500).json({ message: 'שגיאת שרת' });
    }
  });

  app.post('/api/lessons/:slug/quiz/submit', authMiddleware, async (req: AuthRequest, res) => {
    try {
      const { slug } = req.params;
      const userId = req.userId!;
      
      const lesson = await Lesson.findOne({ slug });
      if (!lesson) {
        return res.status(404).json({ message: 'השיעור לא נמצא' });
      }

      const quiz = await Quiz.findOne({ lessonId: lesson._id });
      if (!quiz) {
        return res.status(404).json({ message: 'השאלון לא נמצא' });
      }

      const { answers } = req.body;
      
      if (!Array.isArray(answers) || answers.length !== quiz.questions.length) {
        return res.status(400).json({ message: 'מספר התשובות לא תקין' });
      }

      for (let i = 0; i < answers.length; i++) {
        const answer = answers[i];
        const question = quiz.questions[i];
        
        if (typeof answer !== 'number' || !Number.isInteger(answer) || 
            answer < 0 || answer >= question.choicesHE.length) {
          return res.status(400).json({ message: `תשובה ${i + 1} לא תקינה` });
        }
      }

      const results = quiz.questions.map((question, index) => ({
        questionIndex: index,
        chosenIndex: answers[index],
        isCorrect: answers[index] === question.correctIndex,
        correctIndex: question.correctIndex,
      }));

      const correctCount = results.filter(r => r.isCorrect).length;
      const score = Math.round((correctCount / quiz.questions.length) * 100);
      const passed = correctCount === quiz.questions.length;

      await Progress.findOneAndUpdate(
        {
          userId,
          courseSlug: lesson.courseSlug,
          lessonSlug: lesson.slug,
        },
        {
          status: passed ? 'done' : 'in-progress',
          score,
          answers: results.map(r => ({
            questionIndex: r.questionIndex,
            chosenIndex: r.chosenIndex,
            isCorrect: r.isCorrect,
          })),
          updatedAt: new Date(),
        },
        { upsert: true, new: true }
      );

      if (passed) {
        const allLessons = await Lesson.find({ courseSlug: lesson.courseSlug }).sort({ order: 1 });
        const currentIndex = allLessons.findIndex(l => l.slug === lesson.slug);
        
        if (currentIndex < allLessons.length - 1) {
          const nextLesson = allLessons[currentIndex + 1];
          await Progress.findOneAndUpdate(
            {
              userId,
              courseSlug: lesson.courseSlug,
              lessonSlug: nextLesson.slug,
            },
            {
              status: 'in-progress',
            },
            { upsert: true }
          );
        }
      }

      return res.json({
        correctCount,
        score,
        passed,
        results,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'נתונים לא תקינים' });
      }
      console.error('Submit quiz error:', error);
      return res.status(500).json({ message: 'שגיאת שרת' });
    }
  });

  // ============================================
  // Progress Routes
  // ============================================
  
  app.get('/api/progress/overview', authMiddleware, async (req: AuthRequest, res) => {
    try {
      const userId = req.userId!;
      
      const allLessons = await Lesson.countDocuments();
      const completedProgresses = await Progress.find({ userId, status: 'done' });
      const completedLessons = completedProgresses.length;
      
      const overallPercentage = allLessons > 0
        ? Math.round((completedLessons / allLessons) * 100)
        : 0;

      const courses = await Course.find().sort({ order: 1 });
      const courseProgress = await Promise.all(
        courses.map(async (course) => {
          const lessons = await Lesson.find({ courseSlug: course.slug });
          const totalLessons = lessons.length;
          
          const progresses = await Progress.find({
            userId,
            courseSlug: course.slug,
            status: 'done',
          });
          
          const completedLessons = progresses.length;
          const percentage = totalLessons > 0
            ? Math.round((completedLessons / totalLessons) * 100)
            : 0;

          return {
            courseSlug: course.slug,
            courseTitleHE: course.titleHE,
            completedLessons,
            totalLessons,
            percentage,
          };
        })
      );

      return res.json({
        overallPercentage,
        completedLessons,
        totalLessons: allLessons,
        courseProgress,
      });
    } catch (error) {
      console.error('Get progress overview error:', error);
      return res.status(500).json({ message: 'שגיאת שרת' });
    }
  });

  app.get('/api/progress/history', authMiddleware, async (req: AuthRequest, res) => {
    try {
      const userId = req.userId!;
      
      const completedProgresses = await Progress.find({
        userId,
        status: 'done',
      }).sort({ updatedAt: -1 });

      const history = await Promise.all(
        completedProgresses.map(async (progress) => {
          const lesson = await Lesson.findOne({ slug: progress.lessonSlug });
          const course = await Course.findOne({ slug: progress.courseSlug });

          return {
            courseTitleHE: course?.titleHE || '',
            courseSlug: progress.courseSlug,
            lessonTitleHE: lesson?.titleHE || '',
            lessonSlug: progress.lessonSlug,
            score: progress.score,
            completedAt: progress.updatedAt,
          };
        })
      );

      return res.json(history);
    } catch (error) {
      console.error('Get learning history error:', error);
      return res.status(500).json({ message: 'שגיאת שרת' });
    }
  });

  // ============================================
  // Comments/Discussion Routes
  // ============================================
  
  app.get('/api/lessons/:slug/comments', authMiddleware, async (req: AuthRequest, res) => {
    try {
      const { slug } = req.params;
      
      const lesson = await Lesson.findOne({ slug });
      if (!lesson) {
        return res.status(404).json({ message: 'שיעור לא נמצא' });
      }
      
      const comments = await Comment.find({ lessonSlug: slug })
        .sort({ createdAt: 1 });
      
      const formattedComments = comments.map(comment => ({
        _id: comment._id.toString(),
        lessonSlug: comment.lessonSlug,
        userId: comment.userId.toString(),
        userDisplayName: comment.userDisplayName,
        content: comment.content,
        isMentorResponse: comment.isMentorResponse,
        parentCommentId: comment.parentCommentId?.toString() || null,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      }));
      
      return res.json(formattedComments);
    } catch (error) {
      console.error('Get comments error:', error);
      return res.status(500).json({ message: 'שגיאת שרת' });
    }
  });
  
  app.post('/api/lessons/:slug/comments', authMiddleware, async (req: AuthRequest, res) => {
    try {
      const { slug } = req.params;
      const userId = req.userId!;
      
      const lesson = await Lesson.findOne({ slug });
      if (!lesson) {
        return res.status(404).json({ message: 'שיעור לא נמצא' });
      }
      
      const validation = (await import('@shared/schema')).insertCommentSchema.safeParse({
        ...req.body,
        lessonSlug: slug,
      });
      
      if (!validation.success) {
        return res.status(400).json({ message: 'נתונים לא תקינים' });
      }
      
      if (validation.data.parentCommentId) {
        const parentComment = await Comment.findOne({
          _id: validation.data.parentCommentId,
          lessonSlug: slug,
        });
        if (!parentComment) {
          return res.status(400).json({ message: 'הערת אב לא נמצאה באותו שיעור' });
        }
      }
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'משתמש לא נמצא' });
      }
      
      const comment = await Comment.create({
        lessonSlug: slug,
        userId,
        userDisplayName: user.displayName,
        content: validation.data.content,
        isMentorResponse: false,
        parentCommentId: validation.data.parentCommentId || null,
      });
      
      return res.status(201).json({
        _id: comment._id.toString(),
        lessonSlug: comment.lessonSlug,
        userId: comment.userId.toString(),
        userDisplayName: comment.userDisplayName,
        content: comment.content,
        isMentorResponse: comment.isMentorResponse,
        parentCommentId: comment.parentCommentId?.toString() || null,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      });
    } catch (error) {
      console.error('Create comment error:', error);
      return res.status(500).json({ message: 'שגיאת שרת' });
    }
  });
  
  app.delete('/api/comments/:commentId', authMiddleware, async (req: AuthRequest, res) => {
    try {
      const { commentId } = req.params;
      const userId = req.userId!;
      
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ message: 'הערה לא נמצאה' });
      }
      
      if (comment.userId.toString() !== userId) {
        return res.status(403).json({ message: 'אין הרשאה למחוק הערה זו' });
      }
      
      await Comment.deleteOne({ _id: commentId });
      
      return res.json({ message: 'ההערה נמחקה בהצלחה' });
    } catch (error) {
      console.error('Delete comment error:', error);
      return res.status(500).json({ message: 'שגיאת שרת' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
