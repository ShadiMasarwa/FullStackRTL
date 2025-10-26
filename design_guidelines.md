# FullStackEDU Design Guidelines

## Design Approach

**Selected Approach:** Design System (Material Design principles) with educational platform best practices

**Rationale:** As a Hebrew RTL learning platform prioritizing content clarity, progress tracking, and quiz interactions, Material Design provides excellent RTL support, clear visual hierarchy, and proven patterns for educational experiences. Drawing inspiration from Khan Academy's content focus and Duolingo's progress visualization.

**Core Principles:**
- Content-first hierarchy emphasizing readability in Hebrew
- Clear progress visualization at multiple levels
- Minimal cognitive load during learning
- Consistent, predictable interactions for quiz flows

---

## Typography (RTL Hebrew)

**Primary Font Family:** 
- Heebo (Google Fonts) - Modern Hebrew sans-serif with excellent readability
- Fallback: Assistant, system-ui

**Type Scale:**
- **Display (Hero/Landing):** text-5xl to text-6xl (48-60px), font-bold
- **H1 (Page Titles):** text-4xl (36px), font-bold
- **H2 (Section Headers):** text-3xl (30px), font-semibold
- **H3 (Card Titles/Lesson Names):** text-2xl (24px), font-semibold
- **H4 (Subsections):** text-xl (20px), font-medium
- **Body Large (Lesson Content):** text-lg (18px), font-normal, leading-relaxed
- **Body (UI Text):** text-base (16px), font-normal
- **Small (Metadata/Stats):** text-sm (14px), font-normal
- **Caption (Hints/Labels):** text-xs (12px), font-medium

**RTL Considerations:**
- All text aligned `text-right` by default
- Numbers formatted in Hebrew locale where appropriate
- Consistent `dir="rtl"` on root element

---

## Layout System

**Spacing Primitives:**
- **Primary set:** 2, 4, 8, 12, 16, 24 units (p-2, p-4, p-8, p-12, p-16, p-24)
- **Vertical rhythm:** py-12 (mobile), py-16 (tablet), py-24 (desktop) for sections
- **Component gaps:** gap-4, gap-6, gap-8 for grids/flexbox

**Container Strategy:**
- **Max-width content:** max-w-7xl mx-auto px-4 (general pages)
- **Lesson content:** max-w-4xl mx-auto (optimal reading width)
- **Quiz/Forms:** max-w-2xl mx-auto
- **Full-width sections:** Dashboard cards grid

**Grid Patterns:**
- **Course cards:** grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- **Lesson list:** Single column with clear progression indicators
- **Quiz options:** Single column stack (radio buttons)
- **Stats/Progress:** grid-cols-2 md:grid-cols-4 gap-4

---

## Component Library

### Navigation & Header
- **Main Header:** Sticky top navigation, h-16, flex items-center justify-between
- **Logo:** text-2xl font-bold on right (RTL)
- **Navigation Links:** Horizontal menu on left (RTL reversed), gap-6
- **User Menu:** Avatar + dropdown (rightmost in RTL)
- **Mobile:** Hamburger menu (left side in RTL), drawer slides from left

### Landing Page Components
- **Hero Section:** 
  - Height: min-h-[500px] md:min-h-[600px]
  - Layout: Two-column (md:grid-cols-2) - Text right, illustration/mockup left
  - Include: Main headline, subheadline (leading-relaxed), dual CTAs (primary + secondary)
  - Background: Subtle gradient or geometric pattern overlay
  
- **Features Section:**
  - Three-column grid (lg:grid-cols-3) with icons
  - Each feature: Icon top, title, 2-3 line description
  - Generous py-24 spacing
  
- **Course Overview Grid:**
  - Seven course cards (md:grid-cols-2 lg:grid-cols-3)
  - Each shows: Course icon, title, lesson count, "רמה: מתחיל-בינוני+"
  
- **CTA Section:**
  - Centered, max-w-3xl
  - Headline + supporting text + prominent button
  - py-20 vertical spacing

### Dashboard Components

**Progress Overview Card:**
- Prominent placement at top of dashboard
- Large progress circle (120px diameter) or horizontal bar
- Display: Overall percentage + "X מתוך 56 שיעורים הושלמו"
- Rounded corners (rounded-2xl), generous padding (p-8)
- Shadow: shadow-lg

**Course Cards:**
- Aspect ratio: Maintains consistent height across grid
- Structure: 
  - Top: Course icon (64px, centered)
  - Title (text-2xl, font-semibold)
  - Description (2 lines, text-sm, opacity-75)
  - Progress bar (h-2, rounded-full, mt-4)
  - Stats row: "X/8 שיעורים" + percentage
  - CTA button: "כניסה לקורס" (full-width, mt-4)
- Hover: Subtle lift (hover:shadow-xl, transition-transform)
- Padding: p-6
- Borders: rounded-xl

### Course & Lesson Pages

**Lesson List (Vertical Timeline):**
- Each lesson item: Flex row with status indicator
- Status icons (right side in RTL): 
  - Locked: Lock icon, reduced opacity
  - In Progress: Dot outline
  - Completed: Checkmark circle
- Lesson number + title
- Clickable area: Full card (p-4, rounded-lg)
- Active lesson: Distinct visual treatment

**Lesson Content Page:**
- **Header:** Breadcrumb navigation + lesson title
- **Content Section:**
  - Text content: prose prose-lg with RTL adjustments
  - Code blocks: 
    - Background distinct from content
    - Syntax highlighting
    - Padding: p-4, rounded-lg
    - Font: Monospace (Consolas, 'Courier New')
    - LTR direction (dir="ltr") for code
  - Example cards:
    - Border/background treatment
    - "דוגמה:" label
    - Code + "תוצאה צפויה:" output section
- **Action Button:** Fixed bottom bar or end of content: "המשך לשאלון" (full-width on mobile, max-w-md mx-auto on desktop)

### Quiz Components

**Question Card:**
- One question per card/screen
- Structure:
  - Question number indicator (1/5, 2/5, etc.) top
  - Question text (text-xl, font-semibold, mb-6)
  - Radio options stack vertically (gap-3)
  - Each option: Full-width button-like radio (p-4, rounded-lg, border-2)
  - Selected state: Distinct border treatment
  - Submit button at bottom (disabled until selection)

**Results Screen:**
- Summary card at top: 
  - Large score display (X/5)
  - Pass/fail indicator with icon
  - Message: "כל הכבוד!" or "נסה שוב"
- Question-by-question review:
  - Each question: Compact card showing chosen answer
  - Correct: Checkmark indicator
  - Incorrect: X indicator + "התשובה הנכונה הייתה:"
- Action buttons:
  - Pass: "המשך לשיעור הבא" (primary, prominent)
  - Fail: "נסה שוב" (secondary) + "חזור לשיעור" (tertiary text button)

### Learning History Page

**Table Layout:**
- Responsive: Card stack on mobile, table on desktop (md:table)
- Columns: שם קורס | שיעור | ציון | תאריך
- Rows: Alternating background for readability
- Filters: Dropdown or tabs to filter by course

### Forms (Auth Pages)

**Login/Register:**
- Centered card: max-w-md mx-auto, p-8
- Logo + title at top
- Form fields stack (gap-4):
  - Label (text-sm, font-medium, mb-1)
  - Input (p-3, rounded-lg, border, w-full)
  - Error messages (text-sm, mt-1)
- Submit button: Full-width, p-3, rounded-lg
- Link to alternate form: Center-aligned, text-sm

---

## Progress Visualization

**Progress Bars:**
- Height: h-2 (standard), h-3 (prominent)
- Container: Rounded-full, background treatment
- Fill: Rounded-full, transition-smooth
- Label: Above or below bar showing percentage

**Progress Circles/Rings:**
- Use for overall dashboard progress
- Size: 120-160px diameter
- Stroke width: 8-12px
- Center text: Large percentage + small label below

**Status Badges:**
- Locked lessons: Lock icon + "נעול"
- Completed: Checkmark + "הושלם"
- In Progress: Dot + "בתהליך"
- Compact size: px-3 py-1, rounded-full, text-xs

---

## Iconography

**Icon Library:** Material Icons (via CDN)
- Course icons: 64px for cards, 48px for headers
- UI icons: 24px standard, 20px for inline text
- Status indicators: 16-20px

**Key Icons:**
- Courses: Code, palette, grid, terminal symbols per subject
- Navigation: Menu, home, user, history
- Actions: Arrow-left (next in RTL), lock, check-circle, x-circle
- Progress: Trophy, star, bar-chart

---

## Interactive States

**Buttons:**
- **Primary:** Prominent, full rounded (rounded-lg), px-6 py-3
- **Secondary:** Outline style, same padding
- **Text Button:** No background, underline on hover
- **Disabled:** Reduced opacity (opacity-50), cursor-not-allowed

**Clickable Cards:**
- Hover: Subtle elevation increase (shadow-md to shadow-lg)
- Transition: transition-all duration-200

**Form Inputs:**
- Default: border-2
- Focus: Ring treatment (ring-2, ring-offset-2)
- Error: Border treatment change
- Disabled: Grayed background

**Quiz Options:**
- Unselected: Border style
- Selected: Filled background + border emphasis
- Correct (after submit): Success treatment
- Incorrect (after submit): Error treatment

---

## Responsive Breakpoints

**Mobile First Approach:**
- **Base (< 640px):** Single column, stack navigation, full-width components
- **Tablet (md: 768px):** Two-column course grid, side-by-side auth forms
- **Desktop (lg: 1024px):** Three-column course grid, horizontal navigation, optimal reading widths

**Key Adjustments:**
- Dashboard: 1 → 2 → 3 column grid
- Lesson list: Maintain single column (easier to follow progression)
- Hero: Stack → side-by-side
- Navigation: Hamburger → horizontal menu

---

## Accessibility

- Focus indicators: Visible ring on all interactive elements
- Skip to main content link
- ARIA labels for progress bars, status indicators
- Form labels always visible (not placeholder-only)
- Sufficient touch targets (min 44px height)
- Keyboard navigation: Tab through lessons, quiz options
- Screen reader announcements for quiz results, progress updates

---

## Images

**Hero Section:**
- Large illustration or 3D mockup showing learning interface
- Position: Left side of two-column hero (RTL)
- Size: Full height of hero section
- Style: Modern, friendly illustration or high-quality product screenshot
- Alt text: Descriptive Hebrew text

**Course Icons:**
- Simple, recognizable symbols for each technology
- Consistent style across all seven courses
- Size: 64px in cards, can scale to 96px in course pages

**Empty States:**
- Friendly illustration when no progress yet
- "התחל את המסע שלך!" messaging

No additional decorative images needed - focus on clarity and content.