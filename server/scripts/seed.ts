import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDB } from '../db';
import User from '../models/User';
import Course from '../models/Course';
import Lesson from '../models/Lesson';
import Quiz from '../models/Quiz';
import Progress from '../models/Progress';
import { htmlLessonsContent } from '../data/html-lessons-content';

const DEMO_USER = {
  email: 'demo@fullstackedu.io',
  password: 'Demo1234!',
  displayName: 'משתמש הדגמה',
};

const courses = [
  {
    slug: 'html',
    titleHE: 'HTML',
    descriptionHE: 'למד HTML מהיסודות - מבנה דפי אינטרנט, תגיות, סמנטיקה ונגישות',
    order: 1,
    topics: ['תגיות בסיסיות', 'טפסים', 'סמנטיקה', 'מולטימדיה'],
    levelRange: 'מתחיל–בינוני',
    coverIcon: 'Code',
  },
  {
    slug: 'css',
    titleHE: 'CSS',
    descriptionHE: 'שליטה מלאה בעיצוב ולייאאוט - צבעים, טיפוגרפיה, Flexbox, Grid ורספונסיביות',
    order: 2,
    topics: ['סלקטורים', 'Box Model', 'Flexbox', 'Grid', 'רספונסיביות'],
    levelRange: 'מתחיל–בינוני+',
    coverIcon: 'Palette',
  },
  {
    slug: 'bootstrap',
    titleHE: 'Bootstrap',
    descriptionHE: 'בניית ממשקים מהירה ומקצועית עם Bootstrap - רכיבים מוכנים ו-Grid System',
    order: 3,
    topics: ['Grid System', 'רכיבים', 'Utilities', 'RTL'],
    levelRange: 'מתחיל–בינוני',
    coverIcon: 'Layout',
  },
  {
    slug: 'javascript',
    titleHE: 'JavaScript',
    descriptionHE: 'שפת התכנות של האינטרנט - לוגיקה, DOM, אירועים ועבודה עם API',
    order: 4,
    topics: ['משתנים', 'פונקציות', 'DOM', 'Events', 'Fetch API'],
    levelRange: 'מתחיל–בינוני+',
    coverIcon: 'FileCode',
  },
  {
    slug: 'react',
    titleHE: 'React',
    descriptionHE: 'ספריית JavaScript המובילה לבניית ממשקי משתמש - קומפוננטות, State, Hooks',
    order: 5,
    topics: ['Components', 'Props', 'State', 'Hooks', 'Router'],
    levelRange: 'בינוני–מתקדם',
    coverIcon: 'Layers',
  },
  {
    slug: 'nodejs',
    titleHE: 'Node.js',
    descriptionHE: 'JavaScript בצד השרת - Express, API, אימות ועבודה עם בסיסי נתונים',
    order: 6,
    topics: ['Express', 'Routing', 'Middleware', 'JWT', 'RESTful API'],
    levelRange: 'בינוני–מתקדם',
    coverIcon: 'Server',
  },
  {
    slug: 'mongodb',
    titleHE: 'MongoDB',
    descriptionHE: 'בסיס נתונים NoSQL - Mongoose, סכמות, שאילתות ואינדקסים',
    order: 7,
    topics: ['Mongoose', 'Schemas', 'Queries', 'Indexes', 'Relations'],
    levelRange: 'בינוני–מתקדם',
    coverIcon: 'Database',
  },
];

const lessons: any = {
  html: htmlLessonsContent,
  css: [
    {
      order: 1,
      titleHE: 'התקנת VS Code - הרחבות CSS ו-Prettier',
      pages: [{
        titleHE: 'כלים לעבודה עם CSS',
        contentHE: '<h2>כלים לעבודה עם CSS</h2><p>התקן הרחבות CSS IntelliSense ו-Prettier לעזרה בכתיבה ופורמט אוטומטי.</p>',
        codeExamples: [],
      }],
    },
    {
      order: 2,
      titleHE: 'סלקטורים ומורכבים, Box Model',
      pages: [{
        titleHE: 'בחירת אלמנטים ומודל הקופסה',
        contentHE: '<h2>בחירת אלמנטים ומודל הקופסה</h2><p>סלקטורים: tag, .class, #id. Box Model: margin, border, padding, content.</p>',
        codeExamples: [
          {
            titleHE: 'סלקטור מחלקה',
            code: '.my-class {\n  color: blue;\n  padding: 10px;\n  border: 1px solid black;\n}',
            output: 'טקסט כחול עם padding ובורדר',
            explanationHE: 'סלקטור מחלקה בוחר כל האלמנטים עם class="my-class"',
          },
        ],
      }],
    },
    {
      order: 3,
      titleHE: 'טיפוגרפיה, צבעים, משתני CSS',
      pages: [{
        titleHE: 'עיצוב טקסט וצבעים',
        contentHE: '<h2>עיצוב טקסט וצבעים</h2><p>font-family, font-size, color. משתני CSS: --main-color.</p>',
        codeExamples: [
          {
            titleHE: 'משתני CSS',
            code: ':root {\n  --primary: #0066cc;\n}\n\nh1 {\n  color: var(--primary);\n  font-size: 2rem;\n}',
            output: 'כותרת בצבע כחול בגודל 2rem',
            explanationHE: 'משתני CSS מאפשרים שימוש חוזר בערכים',
          },
        ],
      }],
    },
    {
      order: 4,
      titleHE: 'Flexbox',
      pages: [{
        titleHE: 'פריסה גמישה',
        contentHE: '<h2>פריסה גמישה</h2><p>Flexbox מאפשר סידור אלמנטים בשורה או עמודה בקלות.</p>',
        codeExamples: [
          {
            titleHE: 'מיכל Flex',
            code: '.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}',
            output: 'אלמנטים מסודרים אופקית עם רווח ביניהם',
            explanationHE: 'Flexbox מאפשר שליטה מלאה על פריסת אלמנטים',
          },
        ],
      }],
    },
    {
      order: 5,
      titleHE: 'Grid',
      pages: [{
        titleHE: 'רשת דו-ממדית',
        contentHE: '<h2>רשת דו-ממדית</h2><p>CSS Grid מאפשר פריסות מורכבות עם שורות ועמודות.</p>',
        codeExamples: [
          {
            titleHE: 'Grid פשוט',
            code: '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}',
            output: 'רשת עם 3 עמודות שוות',
            explanationHE: 'Grid מתאים לפריסות דו-ממדיות מורכבות',
          },
        ],
      }],
    },
    {
      order: 6,
      titleHE: 'מיקום - Position, Z-index',
      pages: [{
        titleHE: 'שליטה במיקום אלמנטים',
        contentHE: '<h2>שליטה במיקום אלמנטים</h2><p>position: static, relative, absolute, fixed, sticky.</p>',
        codeExamples: [
          {
            titleHE: 'מיקום מוחלט',
            code: '.absolute {\n  position: absolute;\n  top: 10px;\n  left: 10px;\n  z-index: 10;\n}',
            output: 'אלמנט ממוקם 10px מלמעלה ומשמאל',
            explanationHE: 'מיקום מוחלט מוציא את האלמנט מזרימת המסמך',
          },
        ],
      }],
    },
    {
      order: 7,
      titleHE: 'רספונסיביות ו-Media Queries',
      pages: [{
        titleHE: 'התאמה למסכים שונים',
        contentHE: '<h2>התאמה למסכים שונים</h2><p>Media Queries מאפשרים עיצוב שונה לפי גודל מסך.</p>',
        codeExamples: [
          {
            titleHE: 'Media Query',
            code: '@media (max-width: 768px) {\n  .container {\n    flex-direction: column;\n  }\n}',
            output: 'במובייל - עמודות מסודרות אנכית',
            explanationHE: 'Media Queries מאפשרים עיצוב רספונסיבי',
          },
        ],
      }],
    },
    {
      order: 8,
      titleHE: 'פרויקט מיני - דף רספונסיבי מלא',
      pages: [{
        titleHE: 'בניית דף מלא',
        contentHE: '<h2>בניית דף מלא</h2><p>שלב את כל מה שלמדת: Flexbox, Grid, רספונסיביות.</p>',
        codeExamples: [
          {
            titleHE: 'כרטיס מוצר',
            code: '.card {\n  display: flex;\n  flex-direction: column;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0,0,0,0.1);\n  padding: 20px;\n}',
            output: 'כרטיס מעוצב עם צללית ופינות מעוגלות',
            explanationHE: 'שילוב של Flexbox, Box Model ועיצוב מתקדם',
          },
        ],
      }],
    },
  ],
};

// Generate quiz questions for each lesson
function generateQuizQuestions(courseSlug: string, lessonOrder: number) {
  const baseQuestions: any = {
    html: {
      1: [
        { promptHE: 'מה התפקיד של VS Code?', choicesHE: ['עורך קוד', 'דפדפן', 'שרת', 'מסד נתונים'], correctIndex: 0 },
        { promptHE: 'מה עושה תוסף Live Server?', choicesHE: ['מציג שינויים בזמן אמת', 'מהדר קוד', 'מנפה באגים', 'מנהל קבצים'], correctIndex: 0 },
        { promptHE: 'איך פותחים Extensions ב-VS Code?', choicesHE: ['Ctrl+Shift+X', 'Ctrl+S', 'Alt+F4', 'F12'], correctIndex: 0 },
        { promptHE: 'Live Server הוא:', choicesHE: ['תוסף חינמי', 'שירות בתשלום', 'חובה רק לפרודקשן', 'דורש רישיון'], correctIndex: 0 },
        { promptHE: 'למה צריך Live Server?', choicesHE: ['לראות שינויים מיד', 'לאחסן קבצים', 'לשלוח מיילים', 'לנהל גרסאות'], correctIndex: 0 },
      ],
      2: [
        { promptHE: 'מה הצהרת DOCTYPE?', choicesHE: ['מגדירה את גרסת HTML', 'מגדירה CSS', 'מגדירה JavaScript', 'מגדירה שרת'], correctIndex: 0 },
        { promptHE: 'התגית <head> מכילה:', choicesHE: ['מטא-דאטה', 'תוכן לתצוגה', 'תמונות', 'טבלאות'], correctIndex: 0 },
        { promptHE: 'התגית <body> מכילה:', choicesHE: ['תוכן גלוי למשתמש', 'רק מטא-דאטה', 'רק קוד JavaScript', 'הגדרות שרת'], correctIndex: 0 },
        { promptHE: 'מה המשמעות של dir="rtl"?', choicesHE: ['כיוון מימין לשמאל', 'כיוון משמאל לימין', 'צבע', 'גודל פונט'], correctIndex: 0 },
        { promptHE: 'lang="he" מציין:', choicesHE: ['שפה עברית', 'אנגלית', 'ערבית', 'צרפתית'], correctIndex: 0 },
      ],
    },
    css: {
      1: [
        { promptHE: 'CSS IntelliSense עוזר ב:', choicesHE: ['השלמה אוטומטית', 'ניפוי באגים', 'העלאה לשרת', 'כתיבת JavaScript'], correctIndex: 0 },
        { promptHE: 'Prettier הוא:', choicesHE: ['כלי לפורמט קוד', 'דפדפן', 'שרת', 'מסד נתונים'], correctIndex: 0 },
        { promptHE: 'למה צריך הרחבות CSS?', choicesHE: ['להקל על הכתיבה', 'להדר קוד', 'לשלוח מיילים', 'לנהל משתמשים'], correctIndex: 0 },
        { promptHE: 'Prettier עובד עם:', choicesHE: ['כל סוגי הקבצים', 'רק HTML', 'רק CSS', 'רק JavaScript'], correctIndex: 0 },
        { promptHE: 'פורמט אוטומטי חוסך:', choicesHE: ['זמן ומאמץ', 'כסף', 'נתונים', 'רוחב פס'], correctIndex: 0 },
      ],
      2: [
        { promptHE: 'סלקטור .class בוחר:', choicesHE: ['אלמנטים עם המחלקה', 'אלמנט לפי ID', 'כל האלמנטים', 'רק div'], correctIndex: 0 },
        { promptHE: 'Box Model כולל:', choicesHE: ['margin, border, padding, content', 'רק margin', 'רק border', 'רק content'], correctIndex: 0 },
        { promptHE: 'padding הוא:', choicesHE: ['ריווח פנימי', 'ריווח חיצוני', 'גובה', 'רוחב'], correctIndex: 0 },
        { promptHE: 'margin הוא:', choicesHE: ['ריווח חיצוני', 'ריווח פנימי', 'צבע', 'פונט'], correctIndex: 0 },
        { promptHE: 'border נמצא בין:', choicesHE: ['padding ו-margin', 'margin ו-content', 'padding ו-content', 'שום דבר'], correctIndex: 0 },
      ],
    },
  };

  // Return default questions if not defined
  const defaultQuestions = [
    { promptHE: 'שאלה 1 - הבנת החומר', choicesHE: ['תשובה נכונה', 'תשובה שגויה 1', 'תשובה שגויה 2', 'תשובה שגויה 3'], correctIndex: 0 },
    { promptHE: 'שאלה 2 - יישום מעשי', choicesHE: ['תשובה נכונה', 'תשובה שגויה 1', 'תשובה שגויה 2', 'תשובה שגויה 3'], correctIndex: 0 },
    { promptHE: 'שאלה 3 - דוגמה', choicesHE: ['תשובה נכונה', 'תשובה שגויה 1', 'תשובה שגויה 2', 'תשובה שגויה 3'], correctIndex: 0 },
    { promptHE: 'שאלה 4 - תרגול', choicesHE: ['תשובה נכונה', 'תשובה שגויה 1', 'תשובה שגויה 2', 'תשובה שגויה 3'], correctIndex: 0 },
    { promptHE: 'שאלה 5 - סיכום', choicesHE: ['תשובה נכונה', 'תשובה שגויה 1', 'תשובה שגויה 2', 'תשובה שגויה 3'], correctIndex: 0 },
  ];

  return baseQuestions[courseSlug]?.[lessonOrder] || defaultQuestions;
}

// Add lessons for other courses (simplified for brevity)
['bootstrap', 'javascript', 'react', 'nodejs', 'mongodb'].forEach(courseSlug => {
  lessons[courseSlug] = Array.from({ length: 8 }, (_, i) => ({
    order: i + 1,
    titleHE: `שיעור ${i + 1} - ${courseSlug.toUpperCase()}`,
    pages: [{
      titleHE: `תוכן שיעור ${i + 1}`,
      contentHE: `<h2>תוכן שיעור ${i + 1}</h2><p>זהו תוכן הדגמתי לשיעור ${i + 1} בקורס ${courseSlug}.</p>`,
      codeExamples: i > 0 ? [{
        titleHE: 'דוגמה',
        code: `// Example code for ${courseSlug} lesson ${i + 1}\nconsole.log("Hello from ${courseSlug}");`,
        output: `Hello from ${courseSlug}`,
        explanationHE: 'דוגמה להמחשת הקוד',
      }] : [],
    }],
  }));
});

export async function seed() {
  try {
    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Course.deleteMany({}),
      Lesson.deleteMany({}),
      Quiz.deleteMany({}),
      Progress.deleteMany({}),
    ]);

    console.log('👤 Creating demo user...');
    const passwordHash = await bcrypt.hash(DEMO_USER.password, 10);
    await User.create({
      email: DEMO_USER.email,
      passwordHash,
      displayName: DEMO_USER.displayName,
    });

    console.log('📚 Creating courses...');
    for (const courseData of courses) {
      const course = await Course.create(courseData);
      console.log(`  ✓ Created course: ${course.titleHE}`);

      const courseLessons = lessons[courseData.slug];
      if (courseLessons) {
        for (const lessonData of courseLessons) {
          const lesson = await Lesson.create({
            ...lessonData,
            slug: `${courseData.slug}-lesson-${lessonData.order}`,
            courseSlug: courseData.slug,
          });
          console.log(`    ✓ Created lesson: ${lesson.titleHE}`);

          const questions = generateQuizQuestions(courseData.slug, lessonData.order);
          await Quiz.create({
            lessonId: lesson._id,
            questions,
          });
          console.log(`      ✓ Created quiz with 5 questions`);
        }
      }
    }

    console.log('✅ Seed completed!');
    console.log(`📧 Demo user: ${DEMO_USER.email} / ${DEMO_USER.password}`);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  }
}
