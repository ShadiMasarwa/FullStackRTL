import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDB } from '../db';
import User from '../models/User';
import Course from '../models/Course';
import Lesson from '../models/Lesson';
import Quiz from '../models/Quiz';
import Progress from '../models/Progress';

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
  html: [
    {
      order: 1,
      titleHE: 'התקנת VS Code ותוסף Live Server',
      contentHE: '<h2>סביבת העבודה שלנו</h2><p>Visual Studio Code הוא עורך קוד חינמי ועוצמתי. תוסף Live Server מאפשר לראות שינויים בזמן אמת.</p><p>צעדים להתקנה:</p><ol><li>הורד VS Code מהאתר הרשמי</li><li>התקן את התוכנה</li><li>פתח את VS Code ולחץ על Extensions (Ctrl+Shift+X)</li><li>חפש "Live Server" והתקן</li></ol>',
      examples: [],
    },
    {
      order: 2,
      titleHE: 'מבנה קובץ HTML בסיסי',
      contentHE: '<h2>מבנה דף HTML</h2><p>כל דף HTML מתחיל עם הצהרת DOCTYPE ומכיל את התגיות הבסיסיות: html, head, body.</p>',
      examples: [
        {
          titleHE: 'דף HTML בסיסי',
          code: '<!DOCTYPE html>\n<html lang="he" dir="rtl">\n<head>\n  <meta charset="UTF-8">\n  <title>הדף הראשון שלי</title>\n</head>\n<body>\n  <h1>שלום עולם!</h1>\n</body>\n</html>',
          expectedOutput: 'דף עם כותרת "שלום עולם!" מיושרת לימין',
        },
      ],
    },
    {
      order: 3,
      titleHE: 'כותרות, פסקאות ורשימות',
      contentHE: '<h2>תגיות טקסט בסיסיות</h2><p>נלמד על h1-h6 לכותרות, p לפסקאות, ul/ol לרשימות.</p>',
      examples: [
        {
          titleHE: 'כותרות ורשימות',
          code: '<h1>כותרת ראשית</h1>\n<h2>כותרת משנית</h2>\n<p>זוהי פסקה.</p>\n<ul>\n  <li>פריט 1</li>\n  <li>פריט 2</li>\n</ul>',
          expectedOutput: 'כותרות בגדלים שונים, פסקה ורשימה עם נקודות',
        },
      ],
    },
    {
      order: 4,
      titleHE: 'קישורים ותמונות',
      contentHE: '<h2>הוספת קישורים ותמונות</h2><p>תגית a ליצירת קישורים, img להצגת תמונות.</p>',
      examples: [
        {
          titleHE: 'קישור ותמונה',
          code: '<a href="https://google.com">קישור לגוגל</a>\n<img src="image.jpg" alt="תיאור התמונה">',
          expectedOutput: 'קישור לחיץ ותמונה (אם קיימת)',
        },
      ],
    },
    {
      order: 5,
      titleHE: 'טבלאות',
      contentHE: '<h2>יצירת טבלאות</h2><p>טבלאות נוצרות עם table, tr (שורות), td (תאים).</p>',
      examples: [
        {
          titleHE: 'טבלה פשוטה',
          code: '<table border="1">\n  <tr>\n    <th>שם</th>\n    <th>גיל</th>\n  </tr>\n  <tr>\n    <td>יוסי</td>\n    <td>25</td>\n  </tr>\n</table>',
          expectedOutput: 'טבלה עם כותרות ושורה אחת של נתונים',
        },
      ],
    },
    {
      order: 6,
      titleHE: 'טפסים בסיסיים',
      contentHE: '<h2>יצירת טפסים</h2><p>טפסים מאפשרים למשתמשים להזין נתונים - input, label, select.</p>',
      examples: [
        {
          titleHE: 'טופס פשוט',
          code: '<form>\n  <label>שם:</label>\n  <input type="text" name="name">\n  <input type="submit" value="שלח">\n</form>',
          expectedOutput: 'טופס עם שדה טקסט וכפתור שליחה',
        },
      ],
    },
    {
      order: 7,
      titleHE: 'סמנטיקה - header, nav, main, footer',
      contentHE: '<h2>תגיות סמנטיות</h2><p>תגיות כמו header, nav, main, footer נותנות משמעות למבנה הדף.</p>',
      examples: [
        {
          titleHE: 'מבנה סמנטי',
          code: '<header>\n  <h1>כותרת האתר</h1>\n</header>\n<nav>\n  <a href="#home">בית</a>\n</nav>\n<main>\n  <p>תוכן עיקרי</p>\n</main>\n<footer>\n  <p>זכויות יוצרים 2024</p>\n</footer>',
          expectedOutput: 'דף עם מבנה מאורגן וברור',
        },
      ],
    },
    {
      order: 8,
      titleHE: 'מולטימדיה - audio, video, iframe',
      contentHE: '<h2>הטמעת מדיה</h2><p>HTML5 מאפשר הטמעת שמע, וידאו ותכנים חיצוניים.</p>',
      examples: [
        {
          titleHE: 'סרטון YouTube',
          code: '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>',
          expectedOutput: 'נגן YouTube מוטמע בדף',
        },
      ],
    },
  ],
  css: [
    {
      order: 1,
      titleHE: 'התקנת VS Code - הרחבות CSS ו-Prettier',
      contentHE: '<h2>כלים לעבודה עם CSS</h2><p>התקן הרחבות CSS IntelliSense ו-Prettier לעזרה בכתיבה ופורמט אוטומטי.</p>',
      examples: [],
    },
    {
      order: 2,
      titleHE: 'סלקטורים ומורכבים, Box Model',
      contentHE: '<h2>בחירת אלמנטים ומודל הקופסה</h2><p>סלקטורים: tag, .class, #id. Box Model: margin, border, padding, content.</p>',
      examples: [
        {
          titleHE: 'סלקטור מחלקה',
          code: '.my-class {\n  color: blue;\n  padding: 10px;\n  border: 1px solid black;\n}',
          expectedOutput: 'טקסט כחול עם padding ובורדר',
        },
      ],
    },
    {
      order: 3,
      titleHE: 'טיפוגרפיה, צבעים, משתני CSS',
      contentHE: '<h2>עיצוב טקסט וצבעים</h2><p>font-family, font-size, color. משתני CSS: --main-color.</p>',
      examples: [
        {
          titleHE: 'משתני CSS',
          code: ':root {\n  --primary: #0066cc;\n}\n\nh1 {\n  color: var(--primary);\n  font-size: 2rem;\n}',
          expectedOutput: 'כותרת בצבע כחול בגודל 2rem',
        },
      ],
    },
    {
      order: 4,
      titleHE: 'Flexbox',
      contentHE: '<h2>פריסה גמישה</h2><p>Flexbox מאפשר סידור אלמנטים בשורה או עמודה בקלות.</p>',
      examples: [
        {
          titleHE: 'מיכל Flex',
          code: '.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}',
          expectedOutput: 'אלמנטים מסודרים אופקית עם רווח ביניהם',
        },
      ],
    },
    {
      order: 5,
      titleHE: 'Grid',
      contentHE: '<h2>רשת דו-ממדית</h2><p>CSS Grid מאפשר פריסות מורכבות עם שורות ועמודות.</p>',
      examples: [
        {
          titleHE: 'Grid פשוט',
          code: '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}',
          expectedOutput: 'רשת עם 3 עמודות שוות',
        },
      ],
    },
    {
      order: 6,
      titleHE: 'מיקום - Position, Z-index',
      contentHE: '<h2>שליטה במיקום אלמנטים</h2><p>position: static, relative, absolute, fixed, sticky.</p>',
      examples: [
        {
          titleHE: 'מיקום מוחלט',
          code: '.absolute {\n  position: absolute;\n  top: 10px;\n  left: 10px;\n  z-index: 10;\n}',
          expectedOutput: 'אלמנט ממוקם 10px מלמעלה ומשמאל',
        },
      ],
    },
    {
      order: 7,
      titleHE: 'רספונסיביות ו-Media Queries',
      contentHE: '<h2>התאמה למסכים שונים</h2><p>Media Queries מאפשרים עיצוב שונה לפי גודל מסך.</p>',
      examples: [
        {
          titleHE: 'Media Query',
          code: '@media (max-width: 768px) {\n  .container {\n    flex-direction: column;\n  }\n}',
          expectedOutput: 'במובייל - עמודות מסודרות אנכית',
        },
      ],
    },
    {
      order: 8,
      titleHE: 'פרויקט מיני - דף רספונסיבי מלא',
      contentHE: '<h2>בניית דף מלא</h2><p>שלב את כל מה שלמדת: Flexbox, Grid, רספונסיביות.</p>',
      examples: [
        {
          titleHE: 'כרטיס מוצר',
          code: '.card {\n  display: flex;\n  flex-direction: column;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0,0,0,0.1);\n  padding: 20px;\n}',
          expectedOutput: 'כרטיס מעוצב עם צללית ופינות מעוגלות',
        },
      ],
    },
  ],
  // ... (קיצור - ניצור את שאר הקורסים בצורה דומה)
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
    contentHE: `<h2>תוכן שיעור ${i + 1}</h2><p>זהו תוכן הדגמתי לשיעור ${i + 1} בקורס ${courseSlug}.</p>`,
    examples: i > 0 ? [{
      titleHE: 'דוגמה',
      code: `// Example code for ${courseSlug} lesson ${i + 1}\nconsole.log("Hello from ${courseSlug}");`,
      expectedOutput: `Hello from ${courseSlug}`,
    }] : [],
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
