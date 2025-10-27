export const htmlLessonsContent = [
  // שיעור 1: התקנת VS Code ותוסף Live Server
  {
    order: 1,
    titleHE: 'התקנת VS Code ותוסף Live Server',
    pages: [
      {
        titleHE: 'מהו Visual Studio Code?',
        contentHE: `
          <p><strong>Visual Studio Code</strong> (או בקיצור VS Code) הוא עורך קוד חינמי ועוצמתי שפותח על ידי Microsoft. זהו אחד הכלים הפופולריים ביותר בקרב מפתחים בעולם.</p>
          <p><strong>יתרונות VS Code:</strong></p>
          <ul>
            <li>חינמי לחלוטין ופתוח לקוד</li>
            <li>קל משקל ומהיר</li>
            <li>תומך בכל שפות התכנות</li>
            <li>מערכת תוספים עשירה</li>
            <li>השלמה אוטומטית חכמה</li>
          </ul>
        `,
        codeExamples: [],
      },
      {
        titleHE: 'הורדה והתקנה של VS Code',
        contentHE: `
          <p><strong>שלבי ההתקנה:</strong></p>
          <ol>
            <li>היכנסו לאתר הרשמי: <code>https://code.visualstudio.com</code></li>
            <li>לחצו על כפתור "Download" - האתר יזהה אוטומטית את מערכת ההפעלה שלכם</li>
            <li>הורידו את הקובץ והריצו אותו</li>
            <li>עקבו אחר שלבי ההתקנה (המלצה: סמנו את כל האפשרויות)</li>
          </ol>
          <p><strong>טיפ חשוב:</strong> בעת ההתקנה, ודאו שסימנתם את האפשרות "Add to PATH" - זה יאפשר לכם לפתוח VS Code מכל מקום במחשב.</p>
        `,
        codeExamples: [],
      },
      {
        titleHE: 'התקנת תוסף Live Server',
        contentHE: `
          <p><strong>מהו Live Server?</strong><br>
          Live Server הוא תוסף שמאפשר לראות את השינויים בקוד שלכם בזמן אמת בדפדפן, ללא צורך לרענן ידנית את הדף.</p>
          <p><strong>איך מתקינים:</strong></p>
          <ol>
            <li>פתחו את VS Code</li>
            <li>לחצו על אייקון ה-Extensions בסרגל הצד (או <kbd>Ctrl+Shift+X</kbd>)</li>
            <li>חפשו "Live Server"</li>
            <li>מצאו את התוסף של Ritwick Dey (עם הכי הרבה הורדות)</li>
            <li>לחצו על "Install"</li>
          </ol>
        `,
        codeExamples: [
          {
            titleHE: 'איך להשתמש ב-Live Server',
            code: `<!-- צרו קובץ index.html -->
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>בדיקת Live Server</title>
</head>
<body>
  <h1>שלום עולם!</h1>
</body>
</html>`,
            output: 'כדי להריץ: לחצו ימין על הקובץ ובחרו "Open with Live Server" או על הכפתור "Go Live" בתחתית המסך',
            explanationHE: '<p>כשתשמרו שינויים בקובץ (<kbd>Ctrl+S</kbd>), הדפדפן יתעדכן אוטומטית! זה חוסך המון זמן בזמן פיתוח.</p>',
          },
        ],
      },
    ],
  },

  // שיעור 2: מבנה קובץ HTML בסיסי
  {
    order: 2,
    titleHE: 'מבנה קובץ HTML בסיסי',
    pages: [
      {
        titleHE: 'מהו HTML?',
        contentHE: `
          <p><strong>HTML</strong> (HyperText Markup Language) היא שפת התגיות הסטנדרטית ליצירת דפי אינטרנט. זו לא שפת תכנות, אלא שפת סימון שמגדירה את המבנה והתוכן של עמוד אינטרנט.</p>
          <p><strong>מה אפשר לעשות עם HTML?</strong></p>
          <ul>
            <li>יצירת כותרות, פסקאות וטקסטים</li>
            <li>הוספת תמונות וסרטונים</li>
            <li>יצירת קישורים בין עמודים</li>
            <li>בניית טבלאות וטפסים</li>
            <li>ארגון תוכן באופן סמנטי</li>
          </ul>
          <p>כל דף אינטרנט שאתם רואים בנוי מ-HTML בבסיסו. CSS משמש לעיצוב ו-JavaScript להוספת אינטראקטיביות.</p>
        `,
        codeExamples: [],
      },
      {
        titleHE: 'המבנה הבסיסי של מסמך HTML',
        contentHE: `
          <p>כל מסמך HTML5 מורכב ממספר חלקים עיקריים:</p>
          <ol>
            <li><strong>DOCTYPE</strong> - הצהרה על גרסת HTML</li>
            <li><strong>&lt;html&gt;</strong> - תגית השורש המכילה את כל התוכן</li>
            <li><strong>&lt;head&gt;</strong> - מטא-מידע שלא מוצג למשתמש</li>
            <li><strong>&lt;body&gt;</strong> - התוכן הגלוי של העמוד</li>
          </ol>
        `,
        codeExamples: [
          {
            titleHE: 'תבנית HTML5 בסיסית',
            code: `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>הדף הראשון שלי</title>
</head>
<body>
  <h1>שלום עולם!</h1>
  <p>זהו הדף הראשון שלי ב-HTML.</p>
</body>
</html>`,
            output: 'הדפדפן יציג כותרת גדולה "שלום עולם!" ומתחתיה פסקת טקסט, הכל מיושר לימין',
            explanationHE: `
              <p><strong>הסבר על כל שורה:</strong></p>
              <ul>
                <li><code>&lt;!DOCTYPE html&gt;</code> - אומר לדפדפן שזה מסמך HTML5</li>
                <li><code>lang="he"</code> - מגדיר שהשפה היא עברית (חשוב לנגישות ומנועי חיפוש)</li>
                <li><code>dir="rtl"</code> - קובע שהכיוון מימין לשמאל (Right-To-Left)</li>
                <li><code>charset="UTF-8"</code> - תומך בכל התווים העבריים והבינלאומיים</li>
                <li><code>viewport</code> - גורם לאתר להיות רספונסיבי במכשירים ניידים</li>
              </ul>
            `,
          },
        ],
      },
      {
        titleHE: 'head vs. body - מה ההבדל?',
        contentHE: `
          <p><strong>תגית &lt;head&gt;</strong> מכילה מידע <em>על</em> העמוד, אבל לא מוצגת למשתמש:</p>
          <ul>
            <li>כותרת העמוד (מופיעה בטאב הדפדפן)</li>
            <li>קישורים לקבצי CSS</li>
            <li>תגי מטא למנועי חיפוש</li>
            <li>קישורים לסקריפטים</li>
          </ul>
          <p><strong>תגית &lt;body&gt;</strong> מכילה את כל התוכן <em>הגלוי</em> למשתמש:</p>
          <ul>
            <li>טקסטים וכותרות</li>
            <li>תמונות וסרטונים</li>
            <li>קישורים ו-navigation</li>
            <li>טפסים ואלמנטים אינטראקטיביים</li>
          </ul>
        `,
        codeExamples: [
          {
            titleHE: 'דוגמה מלאה עם head ו-body',
            code: `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <!-- כאן מידע על העמוד -->
  <meta charset="UTF-8">
  <meta name="description" content="אתר תדמית אישי">
  <meta name="author" content="שמך">
  <title>שמך - דף הבית</title>
</head>
<body>
  <!-- כאן התוכן הגלוי -->
  <h1>ברוכים הבאים לאתר שלי</h1>
  <p>שמי <strong>שמך</strong> ואני מפתח ווב.</p>
  <p>באתר תוכלו למצוא פרויקטים ומאמרים.</p>
</body>
</html>`,
            output: 'הדפדפן יציג את התוכן שב-body, והכותרת "שמך - דף הבית" תופיע בטאב',
            explanationHE: '<p>שימו לב: כל מה שכתבנו ב-&lt;head&gt; לא יופיע בעמוד עצמו, אבל הוא חשוב מאוד למנועי חיפוש, לנגישות ולאופן שבו האתר מתנהג.</p>',
          },
        ],
      },
    ],
  },

  // שיעור 3: כותרות, פסקאות ורשימות
  {
    order: 3,
    titleHE: 'כותרות, פסקאות ורשימות',
    pages: [
      {
        titleHE: 'כותרות (Headings): h1 עד h6',
        contentHE: `
          <p>HTML מציעה <strong>6 רמות של כותרות</strong>, מ-h1 (הגדולה ביותר) עד h6 (הקטנה ביותר).</p>
          <p><strong>חוקים חשובים:</strong></p>
          <ul>
            <li><code>&lt;h1&gt;</code> - רק אחת לעמוד (הכותרת הראשית)</li>
            <li><code>&lt;h2&gt;</code> - כותרות של חלקים מרכזיים</li>
            <li><code>&lt;h3&gt;</code> - תת-חלקים תחת h2</li>
            <li>אל תדלגו רמות (אל תעברו מ-h1 ישר ל-h3)</li>
            <li>השתמשו בהן למבנה, לא רק לעיצוב</li>
          </ul>
          <p>מנועי חיפוש כמו Google משתמשים בכותרות כדי להבין את המבנה של העמוד!</p>
        `,
        codeExamples: [
          {
            titleHE: 'דוגמה להירארכיה של כותרות',
            code: `<h1>המדריך המלא ל-HTML</h1>

<h2>פרק 1: מבוא</h2>
<h3>מהו HTML?</h3>
<p>HTML היא שפת הסימון הסטנדרטית ליצירת דפי אינטרנט.</p>

<h3>למה ללמוד HTML?</h3>
<p>HTML הוא הבסיס של כל דף אינטרנט.</p>

<h2>פרק 2: התחלה מהירה</h2>
<h3>הכנת סביבת העבודה</h3>
<p>נצטרך VS Code ו-Live Server.</p>`,
            output: 'מבנה היררכי ברור: כותרת ראשית, פרקים עם תתי-חלקים',
            explanationHE: '<p>שימו לב איך כל h2 היא פרק חדש, וכל h3 היא תת-נושא בתוך הפרק. זה עוזר לגולשים ולמנועי חיפוש להבין את המבנה.</p>',
          },
        ],
      },
      {
        titleHE: 'פסקאות (Paragraphs)',
        contentHE: `
          <p>תגית <code>&lt;p&gt;</code> משמשת ליצירת פסקאות טקסט. הדפדפן אוטומטית מוסיף רווח לפני ואחרי כל פסקה.</p>
          <p><strong>טיפים חשובים:</strong></p>
          <ul>
            <li>תמיד עטפו טקסט רגיל בתגית &lt;p&gt;</li>
            <li>אל תשתמשו ב-&lt;br&gt; ליצירת רווחים (רק לשורה חדשה <em>בתוך</em> פסקה)</li>
            <li>רווחים מרובים בקוד יהפכו לרווח אחד בדפדפן</li>
            <li>שורות ריקות בקוד לא משפיעות על התצוגה</li>
          </ul>
        `,
        codeExamples: [
          {
            titleHE: 'שימוש נכון בפסקאות',
            code: `<p>זוהי הפסקה הראשונה. הדפדפן ישאיר רווח אחריה אוטומטית.</p>

<p>זוהי פסקה שנייה. שימו לב שהשורות הריקות בקוד לא משנות את התצוגה.</p>

<p>אפשר גם       לשים       הרבה       רווחים בקוד, אבל הדפדפן יציג רק רווח אחד.</p>

<p>אם רוצים שורה חדשה בתוך פסקה,<br>משתמשים בתגית br.</p>`,
            output: 'ארבע פסקאות נפרדות עם רווחים ביניהן, והפסקה האחרונה עם שבירת שורה באמצע',
            explanationHE: '<p><strong>טעות נפוצה:</strong> אנשים מנסים ליצור רווחים עם הרבה תגיות &lt;br&gt;. במקום זה, השתמשו ב-CSS בשביל margins ו-padding!</p>',
          },
        ],
      },
      {
        titleHE: 'רשימות עם נקודות (ul) ורשימות ממוספרות (ol)',
        contentHE: `
          <p>HTML מציעה שני סוגי רשימות:</p>
          <ul>
            <li><strong>&lt;ul&gt;</strong> - Unordered List (רשימה עם נקודות)</li>
            <li><strong>&lt;ol&gt;</strong> - Ordered List (רשימה ממוספרת)</li>
          </ul>
          <p>בשני המקרים, כל פריט ברשימה נמצא בתוך תגית <code>&lt;li&gt;</code> (List Item).</p>
          <p><strong>מתי להשתמש בכל סוג?</strong></p>
          <ul>
            <li><strong>ul</strong> - כשסדר הפריטים לא חשוב (רכיבים, יתרונות, תכונות)</li>
            <li><strong>ol</strong> - כשהסדר חשוב (שלבים, דירוג, הוראות)</li>
          </ul>
        `,
        codeExamples: [
          {
            titleHE: 'רשימה עם נקודות (ul)',
            code: `<h2>החומרים הדרושים:</h2>
<ul>
  <li>2 כוסות קמח</li>
  <li>כוס סוכר</li>
  <li>3 ביצים</li>
  <li>חצי כוס חמאה</li>
</ul>`,
            output: 'רשימה עם נקודות שחורות לפני כל פריט',
            explanationHE: '<p>סדר הרכיבים לא ממש חשוב, אז משתמשים ב-ul.</p>',
          },
          {
            titleHE: 'רשימה ממוספרת (ol)',
            code: `<h2>שלבי ההכנה:</h2>
<ol>
  <li>מחממים תנור ל-180 מעלות</li>
  <li>מערבבים את החומרים היבשים בקערה</li>
  <li>מוסיפים את הביצים והחמאה</li>
  <li>אופים למשך 25 דקות</li>
</ol>`,
            output: 'רשימה עם מספרים: 1, 2, 3, 4',
            explanationHE: '<p>כאן הסדר חשוב מאוד! אי אפשר לעשות שלב 4 לפני שלב 1, לכן נשתמש ב-ol.</p>',
          },
          {
            titleHE: 'רשימות מקוננות',
            code: `<h2>קורסים:</h2>
<ul>
  <li>Frontend
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
  </li>
  <li>Backend
    <ul>
      <li>Node.js</li>
      <li>MongoDB</li>
    </ul>
  </li>
</ul>`,
            output: 'רשימה עם תתי-רשימות - Frontend ו-Backend כפריטים ראשיים, וכל אחד עם תתי-פריטים משלו',
            explanationHE: '<p>אפשר לקנן רשימות אחת בתוך השנייה! שימו לב שה-ul הפנימית נמצאת <strong>בתוך</strong> ה-&lt;li&gt; החיצונית.</p>',
          },
        ],
      },
    ],
  },

  // שיעור 4: קישורים ותמונות
  {
    order: 4,
    titleHE: 'קישורים ותמונות',
    pages: [
      {
        titleHE: 'יצירת קישורים עם תגית <a>',
        contentHE: `
          <p>תגית <code>&lt;a&gt;</code> (Anchor) משמשת ליצירת קישורים. התכונה החשובה ביותר היא <code>href</code> (Hypertext Reference) שמגדירה לאן הקישור מוביל.</p>
          <p><strong>סוגי קישורים:</strong></p>
          <ul>
            <li><strong>קישור חיצוני</strong> - לאתר אחר (צריך http:// או https://)</li>
            <li><strong>קישור פנימי</strong> - לעמוד אחר באתר שלנו</li>
            <li><strong>קישור לעוגן</strong> - לחלק מסוים בעמוד</li>
            <li><strong>קישור למייל</strong> - mailto:</li>
            <li><strong>קישור לטלפון</strong> - tel:</li>
          </ul>
        `,
        codeExamples: [
          {
            titleHE: 'קישור חיצוני',
            code: `<p>חפשו ב-<a href="https://www.google.com">גוגל</a> מידע נוסף.</p>

<a href="https://www.youtube.com">לחצו כאן לצפייה ביוטיוב</a>`,
            output: 'קישורים כחולים עם קו תחתון (סגנון ברירת מחדל) שפותחים את האתרים בלחיצה',
            explanationHE: '<p><strong>חשוב:</strong> קישורים חיצוניים חייבים להתחיל ב-<code>https://</code> או <code>http://</code>, אחרת הדפדפן יחשוב שזה קובץ מקומי!</p>',
          },
          {
            titleHE: 'קישור פנימי ופתיחה בטאב חדש',
            code: `<!-- קישור לעמוד אחר באתר שלנו -->
<a href="about.html">אודות</a>
<a href="contact.html">צור קשר</a>

<!-- פתיחה בטאב חדש -->
<a href="https://example.com" target="_blank" rel="noopener">פתח בטאב חדש</a>`,
            output: 'הקישור הראשון והשני יפתחו באותו טאב, השלישי בטאב חדש',
            explanationHE: `
              <p><strong>הסבר על התכונות:</strong></p>
              <ul>
                <li><code>target="_blank"</code> - פותח בטאב/חלון חדש</li>
                <li><code>rel="noopener"</code> - אבטחה (מונע מהאתר החדש לגשת לאתר שלכם)</li>
              </ul>
            `,
          },
          {
            titleHE: 'קישורי מייל וטלפון',
            code: `<!-- קישור שפותח תוכנת מייל -->
<a href="mailto:info@example.com">שלחו לנו מייל</a>

<!-- קישור שפותח חייגן (במובייל) -->
<a href="tel:+972501234567">התקשרו: 050-123-4567</a>

<!-- מייל עם נושא -->
<a href="mailto:support@example.com?subject=פנייה מהאתר">תמיכה טכנית</a>`,
            output: 'לחיצה על הקישורים תפתח את אפליקציית המייל/חייגן',
            explanationHE: '<p>שימושי מאוד באתרי עסקים! במכשירים ניידים, tel: יפתח אוטומטית את החייגן.</p>',
          },
        ],
      },
      {
        titleHE: 'הוספת תמונות עם תגית <img>',
        contentHE: `
          <p>תגית <code>&lt;img&gt;</code> משמשת להצגת תמונות. זו תגית <strong>self-closing</strong> - אין לה תגית סגירה.</p>
          <p><strong>תכונות חובה:</strong></p>
          <ul>
            <li><code>src</code> - מיקום התמונה (Source)</li>
            <li><code>alt</code> - טקסט חלופי (חשוב לנגישות ו-SEO)</li>
          </ul>
          <p><strong>תכונות אופציונליות:</strong></p>
          <ul>
            <li><code>width</code> ו-<code>height</code> - גודל בפיקסלים</li>
            <li><code>title</code> - טקסט שמופיע בריחוף עם העכבר</li>
            <li><code>loading="lazy"</code> - טעינה עצלה (ביצועים)</li>
          </ul>
        `,
        codeExamples: [
          {
            titleHE: 'תמונה בסיסית',
            code: `<img src="cat.jpg" alt="חתול חמוד">

<img src="images/logo.png" alt="לוגו החברה" width="200" height="100">`,
            output: 'התמונות יוצגו בגודל המקורי או בגודל שהוגדר',
            explanationHE: `
              <p><strong>למה alt חשוב?</strong></p>
              <ul>
                <li>אם התמונה לא נטענת, יוצג הטקסט במקומה</li>
                <li>קוראי מסך יקראו את התיאור לעיוורים</li>
                <li>Google משתמש בזה להבנת התמונה (SEO)</li>
              </ul>
            `,
          },
          {
            titleHE: 'מסלולי תמונות - יחסי ומוחלטים',
            code: `<!-- תמונה באותה תיקייה -->
<img src="photo.jpg" alt="תמונה">

<!-- תמונה בתיקיית משנה -->
<img src="images/photo.jpg" alt="תמונה">

<!-- תמונה בתיקייה מעל -->
<img src="../photo.jpg" alt="תמונה">

<!-- תמונה מהאינטרנט -->
<img src="https://example.com/photo.jpg" alt="תמונה חיצונית">`,
            output: 'כל תמונה תוצג בהתאם למיקום שלה',
            explanationHE: '<p><strong>טיפ:</strong> עדיף לארגן תמונות בתיקייה נפרדת (למשל "images") כדי לשמור על סדר בפרויקט.</p>',
          },
          {
            titleHE: 'תמונה לחיצה (Image Link)',
            code: `<!-- תמונה שמובילה לקישור -->
<a href="https://example.com">
  <img src="banner.jpg" alt="לחצו לצפייה במבצעים">
</a>

<!-- תמונה שמגדילה את עצמה -->
<a href="photo-large.jpg" target="_blank">
  <img src="photo-small.jpg" alt="תמונת נוף - לחץ להגדלה" width="200">
</a>`,
            output: 'לחיצה על התמונה תפתח את הקישור/תמונה מוגדלת',
            explanationHE: '<p>פשוט עוטפים את תגית ה-img בתוך תגית a. שימושי מאוד לגלריות תמונות!</p>',
          },
        ],
      },
      {
        titleHE: 'פורמטים של תמונות ואופטימיזציה',
        contentHE: `
          <p><strong>פורמטים נפוצים:</strong></p>
          <ul>
            <li><strong>JPG/JPEG</strong> - טוב לתמונות ממשיות (צילומים). גודל קטן אבל מאבד קצת איכות.</li>
            <li><strong>PNG</strong> - תומך בשקיפות. טוב ללוגואים ואיקונים. גודל גדול יותר.</li>
            <li><strong>SVG</strong> - גרפיקה וקטורית, ניתנת להגדלה ללא אובדן איכות. מושלם ללוגואים.</li>
            <li><strong>WebP</strong> - פורמט מודרני שמשלב יתרונות של JPG ו-PNG. לא כל הדפדפנים תומכים.</li>
            <li><strong>GIF</strong> - אנימציות פשוטות, פחות נפוץ היום.</li>
          </ul>
          <p><strong>טיפים לאופטימיזציה:</strong></p>
          <ul>
            <li>הקטינו את גודל התמונות לפני העלאה (כלים: TinyPNG, Squoosh)</li>
            <li>השתמשו בגודל המתאים - אל תעלו תמונה ענקית אם אתם מציגים אותה קטנה</li>
            <li>שימוש ב-<code>loading="lazy"</code> לתמונות שנמצאות מתחת לקיפול</li>
          </ul>
        `,
        codeExamples: [
          {
            titleHE: 'Lazy Loading - טעינה עצלה',
            code: `<!-- תמונות שנמצאות מעל הקיפול -->
<img src="hero-image.jpg" alt="תמונת נושא ראשית">

<!-- תמונות שנמצאות בתחתית העמוד -->
<img src="gallery1.jpg" alt="תמונה 1" loading="lazy">
<img src="gallery2.jpg" alt="תמונה 2" loading="lazy">
<img src="gallery3.jpg" alt="תמונה 3" loading="lazy">`,
            output: 'התמונות עם loading="lazy" ייטענו רק כשהמשתמש גולל אליהן',
            explanationHE: '<p>זה משפר משמעותית את זמן הטעינה של העמוד! הדפדפן לא יטען תמונות שהמשתמש עדיין לא רואה.</p>',
          },
        ],
      },
    ],
  },

  // שיעור 5: טבלאות
  {
    order: 5,
    titleHE: 'טבלאות',
    pages: [
      {
        titleHE: 'מבנה בסיסי של טבלה',
        contentHE: `
          <p>טבלאות ב-HTML נבנות מתגיות מקוננות:</p>
          <ul>
            <li><code>&lt;table&gt;</code> - מגדירה את הטבלה</li>
            <li><code>&lt;tr&gt;</code> - Table Row - שורה</li>
            <li><code>&lt;td&gt;</code> - Table Data - תא נתונים</li>
            <li><code>&lt;th&gt;</code> - Table Header - תא כותרת (מודגש)</li>
          </ul>
          <p><strong>חשוב:</strong> כל תא (<code>td</code> או <code>th</code>) חייב להיות בתוך שורה (<code>tr</code>).</p>
        `,
        codeExamples: [
          {
            titleHE: 'טבלה פשוטה',
            code: `<table border="1">
  <tr>
    <th>שם</th>
    <th>גיל</th>
    <th>עיר</th>
  </tr>
  <tr>
    <td>יוסי</td>
    <td>25</td>
    <td>תל אביב</td>
  </tr>
  <tr>
    <td>מיכל</td>
    <td>30</td>
    <td>ירושלים</td>
  </tr>
</table>`,
            output: 'טבלה עם 3 עמודות ו-2 שורות נתונים, עם כותרות מודגשות',
            explanationHE: '<p><strong>הערה:</strong> התכונה <code>border="1"</code> מציגה גבולות לטבלה. בעולם המודרני משתמשים ב-CSS לעיצוב הטבלה.</p>',
          },
        ],
      },
      {
        titleHE: 'מבנה מתקדם: thead, tbody, tfoot',
        contentHE: `
          <p>לטבלאות מסודרות, משתמשים ב-3 אזורים:</p>
          <ul>
            <li><code>&lt;thead&gt;</code> - ראש הטבלה (כותרות)</li>
            <li><code>&lt;tbody&gt;</code> - גוף הטבלה (נתונים)</li>
            <li><code>&lt;tfoot&gt;</code> - תחתית הטבלה (סיכומים)</li>
          </ul>
          <p><strong>יתרונות:</strong></p>
          <ul>
            <li>מבנה סמנטי ברור</li>
            <li>עיצוב נפרד לכל אזור ב-CSS</li>
            <li>טבלאות ארוכות - הכותרת תישאר קבועה בגלילה</li>
          </ul>
        `,
        codeExamples: [
          {
            titleHE: 'טבלה מלאה עם מבנה סמנטי',
            code: `<table border="1">
  <thead>
    <tr>
      <th>מוצר</th>
      <th>כמות</th>
      <th>מחיר</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>עכבר</td>
      <td>5</td>
      <td>50 ₪</td>
    </tr>
    <tr>
      <td>מקלדת</td>
      <td>3</td>
      <td>150 ₪</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="2">סה"כ</td>
      <td>700 ₪</td>
    </tr>
  </tfoot>
</table>`,
            output: 'טבלה עם כותרות בראש, נתונים באמצע, וסיכום בתחתית',
            explanationHE: '<p><code>colspan="2"</code> גורם לתא לתפוס 2 עמודות. זה שימושי לסיכומים וכותרות משנה.</p>',
          },
        ],
      },
      {
        titleHE: 'מיזוג תאים: colspan ו-rowspan',
        contentHE: `
          <p>לפעמים צריך לאחד תאים:</p>
          <ul>
            <li><code>colspan</code> - מיזוג לרוחב (כמה עמודות)</li>
            <li><code>rowspan</code> - מיזוג לגובה (כמה שורות)</li>
          </ul>
        `,
        codeExamples: [
          {
            titleHE: 'דוגמה ל-colspan ו-rowspan',
            code: `<table border="1">
  <tr>
    <th>יום</th>
    <th colspan="2">פעילויות</th>
  </tr>
  <tr>
    <td>ראשון</td>
    <td>בוקר: HTML</td>
    <td>ערב: CSS</td>
  </tr>
  <tr>
    <td rowspan="2">שני</td>
    <td>בוקר: JavaScript</td>
    <td>ערב: React</td>
  </tr>
  <tr>
    <td colspan="2">פגישת צוות בערב</td>
  </tr>
</table>`,
            output: 'טבלה עם תאים ממוזגים - כותרת רחבה, ותא גבוה',
            explanationHE: '<p>שימו לב: כשמשתמשים ב-rowspan או colspan, צריך להפחית את מספר התאים בשורות/עמודות המושפעות!</p>',
          },
        ],
      },
    ],
  },

  // שיעור 6: טפסים בסיסיים
  {
    order: 6,
    titleHE: 'טפסים בסיסיים',
    pages: [
      {
        titleHE: 'מבוא לטפסים',
        contentHE: `
          <p>טפסים (Forms) מאפשרים למשתמשים להזין נתונים ולשלוח אותם לשרת.</p>
          <p><strong>שימושים נפוצים:</strong></p>
          <ul>
            <li>טופס התחברות ורישום</li>
            <li>טופס יצירת קשר</li>
            <li>חיפוש באתר</li>
            <li>סקרים ושאלונים</li>
            <li>הזמנות ותשלומים</li>
          </ul>
          <p>תגית <code>&lt;form&gt;</code> עוטפת את כל שדות הקלט.</p>
        `,
        codeExamples: [],
      },
      {
        titleHE: 'שדות קלט בסיסיים',
        contentHE: `
          <p>תגית <code>&lt;input&gt;</code> היא הבסיס לשדות קלט. סוג השדה נקבע על ידי התכונה <code>type</code>.</p>
          <p><strong>סוגי input נפוצים:</strong></p>
          <ul>
            <li><code>text</code> - טקסט חופשי</li>
            <li><code>email</code> - כתובת מייל (עם ולידציה)</li>
            <li><code>password</code> - סיסמה (מוסתרת)</li>
            <li><code>number</code> - מספרים בלבד</li>
            <li><code>date</code> - בחירת תאריך</li>
            <li><code>checkbox</code> - תיבת סימון</li>
            <li><code>radio</code> - בחירה מתוך אפשרויות</li>
            <li><code>submit</code> - כפתור שליחה</li>
          </ul>
        `,
        codeExamples: [
          {
            titleHE: 'טופס התחברות בסיסי',
            code: `<form>
  <label for="username">שם משתמש:</label>
  <input type="text" id="username" name="username" required>
  
  <br><br>
  
  <label for="password">סיסמה:</label>
  <input type="password" id="password" name="password" required>
  
  <br><br>
  
  <input type="submit" value="התחבר">
</form>`,
            output: 'טופס עם שדה שם משתמש, שדה סיסמה וכפתור',
            explanationHE: `
              <p><strong>הסבר התכונות:</strong></p>
              <ul>
                <li><code>for</code> ב-label מתאים ל-<code>id</code> ב-input - מאפשר לחיצה על הטקסט כדי למקד בשדה</li>
                <li><code>name</code> - שם השדה שנשלח לשרת</li>
                <li><code>required</code> - שדה חובה (הדפדפן לא יאפשר שליחה ללא מילוי)</li>
              </ul>
            `,
          },
        ],
      },
      {
        titleHE: 'רכיבי טופס נוספים',
        contentHE: `
          <p>מעבר ל-input, יש עוד רכיבים שימושיים:</p>
          <ul>
            <li><code>&lt;textarea&gt;</code> - שדה טקסט מרובה שורות</li>
            <li><code>&lt;select&gt;</code> - תפריט נפתח</li>
            <li><code>&lt;button&gt;</code> - כפתור (גמיש יותר מ-input type="submit")</li>
          </ul>
        `,
        codeExamples: [
          {
            titleHE: 'טופס יצירת קשר מלא',
            code: `<form>
  <label for="name">שם מלא:</label>
  <input type="text" id="name" name="name" required>
  
  <br><br>
  
  <label for="email">אימייל:</label>
  <input type="email" id="email" name="email" required>
  
  <br><br>
  
  <label for="subject">נושא:</label>
  <select id="subject" name="subject">
    <option value="">בחר נושא</option>
    <option value="support">תמיכה טכנית</option>
    <option value="sales">מכירות</option>
    <option value="other">אחר</option>
  </select>
  
  <br><br>
  
  <label for="message">הודעה:</label><br>
  <textarea id="message" name="message" rows="5" cols="40"></textarea>
  
  <br><br>
  
  <button type="submit">שלח הודעה</button>
</form>`,
            output: 'טופס מלא עם שדות שונים ותפריט נפתח',
            explanationHE: '<p><code>&lt;textarea&gt;</code> מאפשר טקסט ארוך. <code>rows</code> ו-<code>cols</code> קובעים את גודל התיבה.</p>',
          },
          {
            titleHE: 'Checkbox ו-Radio Buttons',
            code: `<form>
  <p>בחר תחומי עניין (אפשר יותר מאחד):</p>
  <input type="checkbox" id="html" name="interests" value="html">
  <label for="html">HTML</label><br>
  
  <input type="checkbox" id="css" name="interests" value="css">
  <label for="css">CSS</label><br>
  
  <input type="checkbox" id="js" name="interests" value="js">
  <label for="js">JavaScript</label><br>
  
  <br>
  
  <p>רמת ניסיון (בחר אחד):</p>
  <input type="radio" id="beginner" name="level" value="beginner">
  <label for="beginner">מתחיל</label><br>
  
  <input type="radio" id="intermediate" name="level" value="intermediate">
  <label for="intermediate">בינוני</label><br>
  
  <input type="radio" id="advanced" name="level" value="advanced">
  <label for="advanced">מתקדם</label><br>
</form>`,
            output: 'תיבות סימון (מרובות) ולחצני רדיו (בחירה יחידה)',
            explanationHE: `
              <p><strong>ההבדל:</strong></p>
              <ul>
                <li><strong>Checkbox</strong> - אפשר לבחור כמה שרוצים</li>
                <li><strong>Radio</strong> - רק בחירה אחת (שים לב ש-<code>name</code> זהה לכולם)</li>
              </ul>
            `,
          },
        ],
      },
    ],
  },

  // שיעור 7: סמנטיקה
  {
    order: 7,
    titleHE: 'סמנטיקה - header, nav, main, footer',
    pages: [
      {
        titleHE: 'מהי HTML סמנטית?',
        contentHE: `
          <p><strong>HTML סמנטית</strong> פירושה שימוש בתגיות שנותנות משמעות לתוכן, לא רק עיצוב.</p>
          <p><strong>מה ההבדל?</strong></p>
          <ul>
            <li><code>&lt;div&gt;</code> - תגית כללית ללא משמעות</li>
            <li><code>&lt;header&gt;</code> - מציינת שזה ראש העמוד</li>
          </ul>
          <p><strong>יתרונות HTML סמנטית:</strong></p>
          <ul>
            <li><strong>נגישות:</strong> קוראי מסך מבינים את המבנה</li>
            <li><strong>SEO:</strong> מנועי חיפוש מבינים את התוכן טוב יותר</li>
            <li><strong>תחזוקה:</strong> קוד ברור וקריא יותר למפתחים</li>
            <li><strong>מבנה:</strong> ארגון לוגי של התוכן</li>
          </ul>
        `,
        codeExamples: [
          {
            titleHE: 'לפני - ללא סמנטיקה',
            code: `<div id="header">
  <div id="logo">לוגו</div>
  <div id="menu">
    <div>בית</div>
    <div>אודות</div>
    <div>צור קשר</div>
  </div>
</div>

<div id="content">
  <div class="post">
    <div class="title">כותרת</div>
    <div class="text">תוכן...</div>
  </div>
</div>

<div id="footer">
  זכויות יוצרים 2024
</div>`,
            output: 'עובד, אבל אין משמעות סמנטית',
            explanationHE: '<p>כל div נראה אותו דבר - לא ברור מה התפקיד של כל חלק.</p>',
          },
          {
            titleHE: 'אחרי - עם סמנטיקה',
            code: `<header>
  <h1>לוגו</h1>
  <nav>
    <a href="/">בית</a>
    <a href="/about">אודות</a>
    <a href="/contact">צור קשר</a>
  </nav>
</header>

<main>
  <article>
    <h2>כותרת</h2>
    <p>תוכן...</p>
  </article>
</main>

<footer>
  <p>זכויות יוצרים 2024</p>
</footer>`,
            output: 'אותה תוצאה ויזואלית, אבל עם משמעות ברורה',
            explanationHE: '<p>עכשיו ברור מה כל חלק עושה - header, nav, main, article, footer.</p>',
          },
        ],
      },
      {
        titleHE: 'תגיות סמנטיות עיקריות',
        contentHE: `
          <p><strong>תגיות פריסה (Layout):</strong></p>
          <ul>
            <li><code>&lt;header&gt;</code> - ראש העמוד/חלק</li>
            <li><code>&lt;nav&gt;</code> - ניווט (תפריטים)</li>
            <li><code>&lt;main&gt;</code> - תוכן ראשי (רק אחד בעמוד)</li>
            <li><code>&lt;aside&gt;</code> - תוכן צדדי</li>
            <li><code>&lt;footer&gt;</code> - תחתית העמוד/חלק</li>
            <li><code>&lt;section&gt;</code> - חלק/מקטע</li>
            <li><code>&lt;article&gt;</code> - תוכן עצמאי (כתבה, פוסט)</li>
          </ul>
        `,
        codeExamples: [
          {
            titleHE: 'מבנה עמוד מלא',
            code: `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>בלוג אישי</title>
</head>
<body>
  
  <header>
    <h1>הבלוג של יוסי</h1>
    <nav>
      <a href="/">בית</a>
      <a href="/about">אודות</a>
      <a href="/blog">מאמרים</a>
      <a href="/contact">צור קשר</a>
    </nav>
  </header>
  
  <main>
    <article>
      <header>
        <h2>כותרת המאמר</h2>
        <p>פורסם ב-1 בינואר 2024</p>
      </header>
      <p>תוכן המאמר...</p>
      <footer>
        <p>תגיות: HTML, CSS</p>
      </footer>
    </article>
    
    <aside>
      <h3>מאמרים פופולריים</h3>
      <ul>
        <li><a href="/post1">מאמר 1</a></li>
        <li><a href="/post2">מאמר 2</a></li>
      </ul>
    </aside>
  </main>
  
  <footer>
    <p>זכויות יוצרים © 2024 יוסי</p>
    <p>עקבו אחרי ברשתות החברתיות</p>
  </footer>
  
</body>
</html>`,
            output: 'עמוד מלא עם מבנה סמנטי ברור',
            explanationHE: `
              <p><strong>שימו לב:</strong></p>
              <ul>
                <li>header ו-footer יכולים להופיע גם בתוך article</li>
                <li>nav בתוך header - מקובל לניווט ראשי</li>
                <li>aside - תוכן נוסף שלא חיוני להבנת התוכן הראשי</li>
              </ul>
            `,
          },
        ],
      },
      {
        titleHE: 'section vs. article vs. div',
        contentHE: `
          <p><strong>מתי להשתמש בכל אחד?</strong></p>
          <ul>
            <li><code>&lt;section&gt;</code> - מקטע נושאי (כותרת + תוכן קשור)</li>
            <li><code>&lt;article&gt;</code> - תוכן עצמאי שניתן לשיתוף (פוסט, כתבה, תגובה)</li>
            <li><code>&lt;div&gt;</code> - כשאין משמעות סמנטית (קבוצה סגנונית בלבד)</li>
          </ul>
        `,
        codeExamples: [
          {
            titleHE: 'דוגמה לשימוש נכון',
            code: `<main>
  <!-- Article - תוכן עצמאי -->
  <article>
    <h2>מדריך HTML למתחילים</h2>
    <p>מאמר מלא שניתן להפיץ בנפרד...</p>
  </article>
  
  <!-- Section - מקטע נושאי בתוך העמוד -->
  <section>
    <h2>מה נלמד בקורס?</h2>
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
  </section>
  
  <!-- Div - קבוצה סגנונית בלבד -->
  <div class="button-group">
    <button>כפתור 1</button>
    <button>כפתור 2</button>
  </div>
</main>`,
            output: 'שימוש נכון בתגיות הסמנטיות',
            explanationHE: '<p><strong>כלל אצבע:</strong> אם אפשר לשתף את התוכן בנפרד - זה article. אם זה חלק מהעמוד - section. אם זה רק לעיצוב - div.</p>',
          },
        ],
      },
    ],
  },

  // שיעור 8: מולטימדיה
  {
    order: 8,
    titleHE: 'מולטימדיה - audio, video, iframe',
    pages: [
      {
        titleHE: 'הטמעת שמע עם <audio>',
        contentHE: `
          <p>תגית <code>&lt;audio&gt;</code> מאפשרת להטמיע קבצי שמע בעמוד.</p>
          <p><strong>פורמטים נתמכים:</strong></p>
          <ul>
            <li><strong>MP3</strong> - הכי נפוץ, נתמך בכל הדפדפנים</li>
            <li><strong>OGG</strong> - פורמט פתוח</li>
            <li><strong>WAV</strong> - איכות גבוהה, גודל גדול</li>
          </ul>
          <p><strong>תכונות שימושיות:</strong></p>
          <ul>
            <li><code>controls</code> - מציג כפתורי play/pause/volume</li>
            <li><code>autoplay</code> - ניגון אוטומטי (לא מומלץ!)</li>
            <li><code>loop</code> - חזרה אוטומטית</li>
            <li><code>muted</code> - התחל מושתק</li>
          </ul>
        `,
        codeExamples: [
          {
            titleHE: 'נגן שמע בסיסי',
            code: `<audio controls>
  <source src="song.mp3" type="audio/mpeg">
  <source src="song.ogg" type="audio/ogg">
  הדפדפן שלך לא תומך בתגית audio.
</audio>`,
            output: 'נגן שמע עם כפתורי בקרה',
            explanationHE: '<p>מספקים מספר פורמטים - הדפדפן ישתמש בראשון שהוא תומך בו. הטקסט בתוך ה-audio יוצג רק אם הדפדפן לא תומך בכלל.</p>',
          },
          {
            titleHE: 'נגן עם אפשרויות נוספות',
            code: `<audio controls loop preload="auto">
  <source src="background-music.mp3" type="audio/mpeg">
</audio>`,
            output: 'נגן שיתחיל בטעינת העמוד ויחזור על עצמו',
            explanationHE: '<p><code>preload="auto"</code> גורם לדפדפן לטעון את הקובץ מראש. שימושי למוזיקת רקע.</p>',
          },
        ],
      },
      {
        titleHE: 'הטמעת וידאו עם <video>',
        contentHE: `
          <p>תגית <code>&lt;video&gt;</code> דומה ל-audio, אבל עם תמיכה בוידאו.</p>
          <p><strong>פורמטים נפוצים:</strong></p>
          <ul>
            <li><strong>MP4</strong> - הכי נתמך</li>
            <li><strong>WebM</strong> - פורמט פתוח, איכות טובה</li>
            <li><strong>OGG</strong> - פחות נפוץ</li>
          </ul>
          <p><strong>תכונות חשובות:</strong></p>
          <ul>
            <li><code>width</code> ו-<code>height</code> - גודל הנגן</li>
            <li><code>poster</code> - תמונה שמוצגת לפני הניגון</li>
            <li><code>controls</code> - כפתורי בקרה</li>
          </ul>
        `,
        codeExamples: [
          {
            titleHE: 'נגן וידאו מלא',
            code: `<video width="640" height="360" controls poster="thumbnail.jpg">
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  הדפדפן שלך לא תומך בתגית video.
</video>`,
            output: 'נגן וידאו עם תמונת תצוגה מקדימה',
            explanationHE: '<p>התמונה ב-<code>poster</code> תוצג עד שהמשתמש ילחץ play. זה משפר את חווית המשתמש ומפחית את הטעינה הראשונית.</p>',
          },
        ],
      },
      {
        titleHE: 'הטמעת תוכן חיצוני עם <iframe>',
        contentHE: `
          <p><code>&lt;iframe&gt;</code> (Inline Frame) מטמיע עמוד אינטרנט אחר בתוך העמוד שלנו.</p>
          <p><strong>שימושים נפוצים:</strong></p>
          <ul>
            <li>סרטוני YouTube</li>
            <li>מפות Google Maps</li>
            <li>פוסטים מרשתות חברתיות</li>
            <li>כלי אינטראקטיביים</li>
          </ul>
          <p><strong>אזהרת אבטחה:</strong> השתמשו ב-iframe רק מאתרים מהימנים!</p>
        `,
        codeExamples: [
          {
            titleHE: 'הטמעת סרטון YouTube',
            code: `<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>`,
            output: 'נגן YouTube מוטמע שניתן להפעיל',
            explanationHE: '<p>כדי לקבל את קוד ההטמעה מ-YouTube, לחצו על "שתף" ואז "הטמע" מתחת לסרטון.</p>',
          },
          {
            titleHE: 'הטמעת מפת Google',
            code: `<iframe 
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13526.123456789..." 
  width="600" 
  height="450" 
  style="border:0;" 
  allowfullscreen="" 
  loading="lazy">
</iframe>`,
            output: 'מפה אינטראקטיבית של Google Maps',
            explanationHE: '<p>כדי לקבל קוד הטמעה מ-Google Maps, חפשו מיקום, לחצו על "שתף" ובחרו "הטמע מפה".</p>',
          },
          {
            titleHE: 'iframe רספונסיבי',
            code: `<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe 
    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
    frameborder="0" 
    allowfullscreen>
  </iframe>
</div>`,
            output: 'iframe שמתאים את עצמו לגודל המסך',
            explanationHE: '<p><code>padding-bottom: 56.25%</code> שומר על יחס 16:9 (מחושב 9/16*100). שיטה זו עובדת מצוין לסרטונים רספונסיביים!</p>',
          },
        ],
      },
    ],
  },
];
